# Oxylabs DevOps candidate Kubernetes task

Hello, dear applicant.

Our development team has been working hard on building a new, bleeding-edge application, and needs your help. 

The MVP of this application has been deployed using docker-compose, but it was so successful, that it needs to be scaled to meet increasing customer demands.

You have been tasked to help migrate the MVP environment to production. A decision was made to utilize Kubernetes container orchestration for production.

Your task is to package the application so it can be deployed to Kubernetes in a convenient manner.

Some tips to get you started:
* Using [Helm](https://helm.sh/) is highly recommended.
* Application should be easily deployable to [minikube](https://github.com/kubernetes/minikube) or a different Kubernetes development environment of choice.
* Web Service should be available on port 80. Container port should not be changed.
* Containers should not contain vulnerabilities, if possible.
* Ingress resource that will expose Web service on port 80 (http) should be deployed as part of the package.
* Application should be secured according to your understanding (e.g. [PodSecurityPolicy](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)).
* Redis service should use PersistentVolumeClaim subsystem to persist data when deployed.
* Redis service should not be accessible externally.
* Redis containers should be password protected.
* Redis password should be stored as a Secret and exposed via Environment Variables.

What we expect as a result of this task:
* Resources needed to deploy the application on Kubernetes (YAML manifests, Helm Charts, etc).
* Documentation is key. The HOWTO you provide should allow other engineers to deploy the application with ease.
* It is not mandatory to follow all of the tips, however you should try to do your best and impress our development team :)

What we find extra value in:
* Write-up of steps taken to accomplish the task (the more highly-detailed, the better!).
* Review of issues you've ran into and steps taken to solve or work-around them.
* Improvements to the application (including Dockerfile) that may help with deployment/development are highly welcome.

## About the application
This micro-service is written in NodeJS. The application code is contained in a single file - `app.js`. However, it depends on some external libraries, which are managed by `npm`.

The micro-service reads the time last HTTP request was made from Redis, logs the timestamp of the current request and writes it back to Redis. The initial request does not return a timestamp, since no requests were made previously.

### Running application locally via docker-compose
```
docker-compose up
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.
