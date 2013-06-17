class HomeController < ApplicationController
  def index
  end
  
  def team
    render 'home/team.html.erb'
  end
  
  def me
    render 'home/me.html.erb'
  end
  
end
