class LanguageController < ApplicationController
  
  def index
    
    require "net/http"
    require "uri"

    uri = URI.parse("http://en.wikipedia.org/wiki/Special:Random")

    # Shortcut
    # response = Net::HTTP.post_form(uri, {"q" => "My query", "per_page" => "50"})

    # Full control
    http = Net::HTTP.new(uri.host, uri.port)

    request = Net::HTTP::Post.new(uri.request_uri)
    # request.set_form_data({"q" => "My query", "per_page" => "50"})

    response = http.request(request)
    # uri = URI.parse('http://en.wikipedia.org/wiki/Same_origin_policy')
    # http = Net::HTTP.new(uri.host, uri.port)
    # request = Net::HTTP::Get.new(uri.request_uri)
    # response = http.request(request)
    # puts response.body  
  end
  
  def upload    
  
    # name = params[:upload][:datafile].original_filename
    words = {"" => 0}
    words.clear
  
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
    render :action => :language
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
