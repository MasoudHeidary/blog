---
title: "Cloud microsecond scheduler challenges, and a possible solution"
date: 2025-11-11
description: "A review of how schedulers work, and why in microsecond scale they are inefficient and possible solutions."
slug: "cloud-microsecond-scheduler"
keywords: ["hugo", "cloud", "AWS" "blog", "github pages", "web development", "tutorial"]
tags: ["cloud", "tutorial"]
categories: ["tutorials"]
author: "Masoud"
draft: false
---

# Cloud Scheduler

# Intro

I have been tasked to do a presentation om edge research on cloud schedulling policies, so I came across a new paper, [Achieving Microsecond Scale Tail Latency Efficiently With Approximate Optimal Scheduling](https://marioskogias.github.io/docs/concord.pdf).
Schedulling is when we want to run multiple application on one single CPU in a way that they all look seemless to us. In practice we are only capable of running one instructiom at a time on CPU, so we do a time division between apps and allocate CPU time to each app for a period of time. If the period of time to each app is short, all the apps looks executing at the same time for us. For more understanding you can read [CPU scheduling in operating systems](https://www.geeksforgeeks.org/operating-systems/cpu-scheduling-in-operating-systems/), or simply watch ["The Fancy Algorithms That Make Your Computer Feel Smoother"](https://youtu.be/O2tV9q6784k?si=b66q0iXiMq7MIwLM) Youtube video.

# cloud scheduler VS OS scheduler

This two looks similar in many aspects, but don't forget we are dealing with virtualiazed CPU cores! This will cause us some difficulties in scheduling.
I found a great [virtual processor scheduling](https://www.flackbox.com/virtual-processor-scheduling-how-vmware-and-microsoft-hypervisors-work-at-the-cpu-level) which would relive me from the pain of explaining everything.

# Scheduler overhead

We have there sources of overheads which we can summaries as follow:
- Changing process(tasks)
- Idle worker
- Idle dispatcher

## changing process

chaning process can be done in two main ways, dispatcher which is the main core that allocates process to a worker can stop the worker from current process by sending an inrerupt and allocate a new process, or the process itself can ask dispatcher "is my time done?", and if the time is done the process will stop itself and worker will pull another process in.
Interupt is costly, but precise  
VS  
polling which is cheaper per poll BUT can be infrequent and inprecise, or frequeng but precise which will increase the cost.

## Idle worker

Workers after finishing a process need to communicate with dispatcher, so dispatcher will allocate a new process to them from main queue. at the mean time the worker will be idle.

## Idle dispatcher

Dispatcher is the master of communication with workers and allocation, if there is nothing to do it will sit idle which is a waste!


# This paper solutions

In the following presentation, I have showed how this precise scheduling can be done. file








