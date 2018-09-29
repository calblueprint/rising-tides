Rails.application.routes.draw do
  devise_for :admins, path: 'admins', controllers: {
    sessions: 'admins/sessions',
    registrations: 'admins/registrations',
  }
  devise_for :community_leaders, path: 'community_leaders', controllers: {
    sessions: 'community_leaders/sessions',
    registrations: 'community_leaders/registrations',
  }
  devise_for :volunteers, path: 'volunteers', controllers: {
    sessions: 'volunteers/sessions',
    registrations: 'volunteers/registrations',
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :volunteers

  resources :community_leaders

  resources :admins
  
  root to: redirect('/volunteers/sign_in')
end
