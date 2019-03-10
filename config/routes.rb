Rails.application.routes.draw do
  devise_for :admins, skip: :registrations, controllers: {
      session: 'admins/sessions'
  }
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :organizations, controllers: {
      sessions: 'organizations/sessions',
      registrations: 'organizations/registrations'
  }
  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :applications # To be deleted, currently just for testing
  # resources :admins, only: [:show]
  resources :users, only: [:show]
  resources :organizations, only: [:show]

  resources :projects, only: [:index, :new, :show, :edit, :apply] do
    resources :applications, only: [:new, :show, :edit, :delete]
  end

  authenticated :user do
    root 'users#dashboard', as: :authenticated_user_root
  end

  authenticated :organization do
    root 'organizations#dashboard', as: :authenticated_organization_root
  end

  namespace :api, defaults: { format: :json } do
    resources :organizations do
      resources :projects, only: [:index]
    end
    resources :projects, only: [:index, :create, :update, :destroy, :show]  do
      resources :applications, only: [:index, :decision]
    end
    resources :users
    resources :applications, only: [:create, :update, :destroy, :decide]
    post '/applications/:id/decide', to: 'applications#decide'
    get '/users/:user_id/applications', to: 'applications#user_index'
    get '/all_projects', to: 'projects#index_all'
  end

  root 'pages#dashboard'

  get '*path' => redirect('/')
end
