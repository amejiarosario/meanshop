# config valid only for current version of Capistrano
lock '3.4.0'

# forward the keys:
# $ ssh-add ~/.ssh/id_rsa
# $ ssh-add -L

set :application, 'meanshop'
set :repo_url, 'git@github.com:amejiarosario/meanshop.git'
set :user, 'deployer'
set :node_version, 'v0.12.7'

# Default branch is :master
ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/home/#{fetch(:user)}/#{fetch(:application)}"

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
set :pty, true
set :forward_agent, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')
# set :linked_dirs, %w{node_modules}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do
  after :deploy, 'app:default'
  after :deploy, 'nginx:default'
  before 'deploy:reverted', 'app:default'
end
