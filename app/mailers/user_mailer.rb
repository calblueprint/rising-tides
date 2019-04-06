class UserMailer < ApplicationMailer
  default from: 'no-reply@risingtides.org'

  def application_recieved
    @user = params[:user]
    @project = params[:project]
    @organization = params[:organization]
    mail(to: @organization.email, subject: 'You recieved an application!')
  end

  def application_decision
    @application = params[:application]
    mail(to: @application.user.email, subject: 'Your application was reviewed')
  end
end
