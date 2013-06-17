class VoxController < ApplicationController
  def index
  end
  
  def overview
    render 'vox/overview.html.erb'
  end
  
  def technologies
    render 'vox/technologies.html.erb'
  end
  
  def application
    render 'vox/application.html.erb'
  end
  
  def old
    render 'vox/old.html.erb'
  end
end
