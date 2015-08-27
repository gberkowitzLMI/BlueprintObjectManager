angular.module('DEMO_MODULE').factory("ChannelTemplate", function($resource){
    return $resource("/blueprint/channel-templates/:deviceTemplateId");
});