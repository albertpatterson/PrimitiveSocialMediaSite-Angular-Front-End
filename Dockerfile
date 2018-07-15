FROM nginx

COPY  ./dist /etc/nginx/html/social-media
COPY nginx.conf /etc/nginx/

EXPOSE 80

CMD service nginx start
