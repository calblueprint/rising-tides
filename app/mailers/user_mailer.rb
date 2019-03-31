class UserMailer < ApplicationMailer
    default from: 'no-reply@risingtides.org'

    def application_recieved
        @user = params[:user]
        @project = params[:project]
        mail(to: @user.email, subject: 'You recieved an application!')
    end
end
