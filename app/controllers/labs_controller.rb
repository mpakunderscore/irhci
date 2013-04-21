class LabsController < ApplicationController

def index
  @words = {"the" => 0}
end

def upload    
  
  # name = params[:upload][:datafile].original_filename
  words = {"the" => 0}
  words_size = 0
  File.open(params[:upload][:datafile].tempfile, "r").each_line do |line|
    # ([a-zA-Z][[a-zA-Z]']*[a-zA-Z])|([a-zA-Z]+)
    line.scan(/[a-zA-Z]{2,}/).each do |word|
          words_size += 1
          word = word.downcase
          if words[word] != nil then
    	      words[word] += 1
          else 
            words[word] = 1
          end                         
    end
  end
  

  @words = words.sort {|a,b| b[1] <=> a[1]}
  render :action => :index
end

def save
    
  tempfile = params[:save][:datafile].tempfile
  File.open(tempfile, "w").each_line do |line|
  end
  send_file(file, :disposition => 'attachment', :stream => true, :buffer_size => 4096)  
  # @filename ="#{RAILS_ROOT}/tmp/test/test.doc"
  # send_file(@filename, :filename => "test.doc")  
end


end

