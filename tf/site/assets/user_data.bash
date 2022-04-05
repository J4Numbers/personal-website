#!/bin/bash

echo "ECS_CLUSTER=${env}-${application_name}" >> /etc/ecs/ecs.config;
echo "ECS_BACKEND_HOST=" >> /etc/ecs/ecs.config;
