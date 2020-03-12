# Solution to Oxylabs DevOps candidate Kubernetes task

## Applicant: Vytautas Zapolskas

## Environment:

- OS: Windows 10 Version 1903 (OS Build 18362.657)
- Hypervisor: Hyper-V
- Kubernetes development environment: minikube version: v1.8.1
- Helm: version v3.1.1

## Prerequisites:

Enable hyperv in Windows 10. First enable Hyper-V feature in W10:

```ps
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

Then enable in command prompt:

```cmd
BCDEDIT /Set {current} hypervisorlaunchtype auto
```

Restart computer:

```ps
shutdown -r -t 00
```

Install chocolatey package manager:

```ps
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

Install Minikube using Chocolatey:

```ps
choco install minikube -Y
```

Start Minikube:

```ps
minikube start --vm-driver=hyperv --memory=4gb
```

Enable ingress controller on minikube:

```ps
minikube addons enable ingress
```

Install Helm:

```ps
choco install kubernetes-helm -Y
```

Install git:

```ps
chocolatey install git -Y
```

## Project modification:

Had to add an extra code line to the package json, so that docker build does not show any errors:

```js
"private" : true
```

Had to build docker image from dockerfile and upload it to Docker Registry (DockerHub)

```ps
docker build -f .\docker\Dockerfile
```

or run docker-compose in docker environment and retag and push your image to docker hub (zapolskas/oxylabs-app:latest)

## PROJECT DEPLOYMENT TO MINIKUBE

As the environment is ready and all the prerequesites are met we start Helming. First, clone git repo:

```ps
git clone https://github.com/zapolskas/devops-k8s-master.git
```

Deploy redis and then NodeJS app to Minikube using Helm:

```ps
cd .\devops-k8s-master\helm\
helm install redis --debug .\redis\
helm install app --debug .\app\
```

If you want to uninstal helm deployment, run:

```ps
helm uninstall {deployment_name} e.g. helm uninstall app
```

## TESTING APP

first we need to get minikube IP, run:

```ps
minikube ip
```

then go to http://{minikube-ip}/ , e.g. http://172.18.106.235/

## Problems

- Had to get familliar how minikube works. Previously only have worked with Docker Desktop and Docker Desktop with kubernetes enabled. Also with Kubernetes in different environments (Prod,stg and test) deployed to VMWare VMs using Kuberspray (Collection of Ansible playbooks)

- Had to get fammiliar with Redis, go to Redis container and check if auth works with redis-cli -a. Check if PVC is configured correctly by reinstalling helm deployment and checking last_timestamp value with redis-cli.

- At first wanted to use bitnami redis chart. But ended up creating all deployment with kubectl and then packaging yaml files to Helm structure. Added several Helm templating examples to values.yaml

- Most of the problems were related to exposing http traffic to the app pod. Had to remember the difference between ClusterIP, NodePort, Loadbalancer. At first used nodeport, but couldn't map to port 80 due to minikube limitations which could be fixed by running minikube with different parameters:

```ps
minikube start --vm-driver=hyperv --memory=4gb --extra-config=apiserver.service-node-port-range=1-65535
```

- Tried to install official nginx ingress controller provided by Kubernetes, but it couldn't work with minikube. So I had to use ingress addon provided by minikube.

- Missed some selectors so couldn't map kubernetes services to pods.

- Had to lookup how to inject Secret value as part of the containers args value.

- No experience with Pod Security Policies