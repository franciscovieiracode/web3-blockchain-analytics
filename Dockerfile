FROM gitlab/gitlab-runner:latest
RUN apt-get update && apt-get install -y ca-certificates openssl
ARG cert_location=/usr/local/share/ca-certificates
# Get certificate from "gitlab.estg.ipp.pt"
RUN openssl s_client -showcerts -connect gitlab.estg.ipp.pt:443 </dev/null 2>/dev/null|openssl x509 -outform PEM >
# Update certificates
RUN update-ca-certificates
