FROM hypriot/rpi-node:latest

# https://docs.flowhub.io/getting-started-node/

# Prepare a Node.js project
RUN mkdir noflo-example      && \
    cd noflo-example         && \
    npm init --yes           
    
# Install NoFlo itself     
RUN npm install noflo --save 
    
# Install a few components (there are many more)     
RUN npm install noflo-filesystem --save && \
    npm install noflo-core       --save && \  
    npm install noflo-amqp       --save && \  
    npm install noflo-packets    --save && \  
    npm install noflo-mqtt       --save   

# Install the runtime
RUN npm install noflo-nodejs --save

COPY init-and-run.sh .
RUN chmod ug+x init-and-run.sh 

CMD ./init-and-run.sh


EXPOSE 3569
