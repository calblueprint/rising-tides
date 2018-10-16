Rails.application.routes.draw do
  devise_for :users, path: 'users', controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users

  authenticated :user do
    root 'users#show', as: :authenticated_user_root
  end

  namespace :api, defaults: { format: :json } do
    resources :projects, :only => [:index, :show, :create, :update, :destroy]
  end

  root to: redirect('/users/sign_up')
end
