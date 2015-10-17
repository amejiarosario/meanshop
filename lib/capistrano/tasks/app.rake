namespace :app do
  desc 'Install node dependencies'
  task :install do
    on roles :app do
      within release_path do
        execute :npm, 'install', '--no-spin', '--silent'
        execute :bower, 'install', '--config.interactive=false', '--silent'
        execute :npm, :update, 'grunt-contrib-imagemin'
        execute :grunt, 'build'
      end
    end
  end

  desc 'Run the apps and also perform zero-downtime updates'
  task :run do
    on roles :app do |host|
      null, app1, app2 = capture(:pm2, 'list', '-m').split('+---')
      if app1 && app2 && app1.index('online') && app2.index('online')
        execute :pm2, :restart, 'app-1'
        sleep 15
        execute :pm2, :restart, 'app-2'
      else
        execute :pm2, :kill
        template_path = File.expand_path('../templates/pm2.json.erb', __FILE__)
        host_config   = ERB.new(File.new(template_path).read).result(binding)
        config_path = "/tmp/pm2.json"
        upload! StringIO.new(host_config), config_path
        execute "IP=#{host.properties.private_ip}", "pm2", "start", config_path
      end
    end
  end

  task default: [:install, :run]
end
