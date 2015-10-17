namespace :nginx do
  task :info do
    on roles :all do |host|
      info "host #{host}:#{host.properties.inspect} (#{host.roles.to_a.join}): #{capture(:uptime)}"
    end
  end

  desc 'Install nginx'
  task :install do
    on roles :web do
      execute :sudo, 'add-apt-repository', '-y', 'ppa:nginx/stable'
      execute :sudo, 'apt-get', '-y', 'update'
      execute :sudo, 'apt-get', 'install', '-y', 'nginx'
    end
  end

  desc 'Set config file for nginx'
  task :setup do
    on roles :web do |host|
      template_path = File.expand_path('../templates/nginx.conf.erb', __FILE__)
      file = ERB.new(File.new(template_path).read).result(binding)
      file_path = '/tmp/nginx.conf'
      dest = "/etc/nginx/sites-available/#{fetch(:application)}"
      upload! StringIO.new(file), file_path
      execute :sudo, :mv, file_path, dest
      execute :chmod, '0655', dest
      execute :sudo, :ln, '-fs', dest, "/etc/nginx/sites-enabled/#{fetch(:application)}"
    end
  end

  task :remove do
    on roles :web do
      execute :sudo, :'apt-get', :remove, :'-y', :nginx
    end
  end

  %w[start stop restart status].each do |command|
    desc "run #{command} on nginx"
    task command do
      on roles :web do
        execute :sudo, 'service', 'nginx', command
      end
    end
  end

  desc 'Install nginx and setup config files'
  task default: [:install, :setup, :restart]
end
