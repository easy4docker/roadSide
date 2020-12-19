
# -- Remove docker app ... <%=@serverName %> ---

docker container stop <%=@siteContainer %>

docker container rm <%=@siteContainer %>

docker image rm -f <%=@siteImage %>

docker container stop <%=@siteContainer %>_eng

docker container rm <%=@siteContainer %>_eng

docker image rm -f <%=@siteImage %>_eng