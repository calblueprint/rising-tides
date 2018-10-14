Rails.application.routes.draw do
  devise_for :users, path: 'users', controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
  }
  devise_for :admins, path: 'admins', controllers: {
    sessions: 'admins/sessions',
    registrations: 'admins/registrations',
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users

  resources :admins

  namespace :api, defaults: { format: :json } do
    resources :projects, :only => [:index, :show, :create, :update, :destroy]
  end

  root to: redirect('/users/sign_in')
end
