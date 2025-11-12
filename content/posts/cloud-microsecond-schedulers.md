---
title: "Cloud microsecond scheduler challenges, and a possible solution"
date: 2025-11-11
description: "A review of how schedulers work, and why in microsecond scale they are inefficient and possible solutions."
slug: "cloud-microsecond-scheduler"
keywords: ["hugo", "cloud", "AWS", "blog", "github pages", "web development", "tutorial"]
tags: ["cloud", "tutorial"]
categories: ["tutorials"]
author: "Masoud"
draft: false
---

# Cloud Scheduler

# Intro

I have been tasked to do a presentation on edge research on cloud scheduling policies, so I came across a new paper, [Achieving Microsecond Scale Tail Latency Efficiently With Approximate Optimal Scheduling](https://marioskogias.github.io/docs/concord.pdf).

**What is scheduling?** 
Scheduling is when we want to run multiple application on one single CPU in a way that they all look seemless to us. In practice we are only capable of running one instruction at a time on CPU, so instead we do a time division between apps and allocate CPU time to each app for a period of time. If the period of time to each app is short enough, all the apps looks executing at the same time for us. 

For more understanding you can read [CPU scheduling in operating systems](https://www.geeksforgeeks.org/operating-systems/cpu-scheduling-in-operating-systems/), or simply watch ["The Fancy Algorithms That Make Your Computer Feel Smoother"](https://youtu.be/O2tV9q6784k?si=b66q0iXiMq7MIwLM) Youtube video.

![what is scheduling explanation](/cloud-microsecond-schedulers-page2.gif)

# cloud scheduler VS operating system scheduler

This two looks similar in many aspects, but don't forget we are dealing with virtualiazed CPU cores! This will cause us some difficulties in scheduling. One main difference that we need to know is that in operating systems schedulers we don't have a dedicated CPU core for dispatcher, but in cloud servers we have dedicated CPU for only for dispatcher because it is far more important in cloud for us compared to operating systems.

![introduction to cloud scheduler](/cloud-microsecond-schedulers-page3.gif)

I found a great [virtual processor scheduling](https://www.flackbox.com/virtual-processor-scheduling-how-vmware-and-microsoft-hypervisors-work-at-the-cpu-level) which would relive me from the pain of explaining everything.

## cloud model

One dedicated core is allocated to dispatcher and the rest of the CPU cores are dedicated to workers to do the process executions. we can consider the model as following:

![cloud scheduler model](/cloud-microsecond-schedulers-page4.gif)

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

![dispatcher intrupt waste cycles](/cloud-microsecond-schedulers-page6.gif)

![process polling waste cycles](/cloud-microsecond-schedulers-page7.gif)

## Idle worker

Workers after finishing a process need to communicate with dispatcher, so dispatcher will allocate a new process to them from main queue. at the mean time the worker will be idle.

![idle worker waste cycles](/cloud-microsecond-schedulers-page8.gif)

## Idle dispatcher

Dispatcher is the master of communication with workers and allocation, if there is nothing to do it will sit idle which is a waste!

![idle dispatcher waste cycles](/cloud-microsecond-schedulers-page9.gif)

# This paper solutions

In the following presentation, I have showed how this precise scheduling method can be done. [download cloud microsecond scheduler presentation](/cloud-microsecond-scheduler-presentation.pptx).







