class HomeController < ApplicationController
  def index
  end
  
  def me
    render 'home/me.html.erb'
  end
  
  def test
    render 'home/test.html.erb'
  end
  
  def test
    render 'home/ideas.html.erb'
  end
  
end
