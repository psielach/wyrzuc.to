module Zut
  # This is base for all service zut controllers
  class ApplicationController < ::ApplicationController
    protect_from_forgery with: :exception
    before_action :authenticate_employee!
    layout 'zut/application'
  end
end
