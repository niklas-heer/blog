---
layout: post
title: Jekyll - from zero to hero
published: true
date: 2014-12-05 14:16:47
categories: []
tags: [code, jekyll, linux, git, web]
image:
  feature: abstract-5.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<center>
    <figure>
        <a href="/assets/images/2014-12-05/after.png"><img src="/assets/images/2014-12-05/after.png" alt=""></a>
        <figcaption>my blog was never faster nor easier to deploy!</figcaption>
    </figure>
</center>

## Deployment via git

### The local repository
You can host your site on [Gitlab][gitlab], [Github][github] or something else - just like I do.
But if you want to start from scratch you can make a folder and initialize git in it, after that you can copy over your Jekyll files.

{% highlight bash %}
mkdir jekyll && cd jekyll
git init
cp -r /path/to/old_jekyll_folder /path/to/jekyll
git add .
git commit -am "initial commit."
{% endhighlight %}

### The remote repository
Now we need a new repository on your web-server, but it doesn't need to be inside your web directory - just somewhere inside the system. I assume you have configured your public-key to work as a login and you also need write-privileges to the web directory with this user.<br>
First we need to initialize the repository:

{% highlight bash %}
#Initialized empty Git repository in /home/nh/website.git/
mkdir website.git && cd website.git
git init --bare
{% endhighlight %}

Then we need define a post-receive hook that checks out the latest changes into the web-servers DocumentRoot (this directory must exist; Git will not create it for you):

{% highlight bash %}
nano hooks/post-receive
{% endhighlight %}

Put this inside the file:

{% highlight bash %}
#!/bin/sh
GIT_WORK_TREE=/var/www/www.example.org git checkout -f
{% endhighlight %}

After that we need to enable the hook which will be triggered every time we push our changes to this repository. It will apply every commit to the directory which you have defined inside the post-receive hook.

{% highlight bash %}
chmod +x hooks/post-receive
{% endhighlight %}

We are now done on the server and we only need to set up the update process on the local system.

### The update process
First we need to edit our git config file in our local repository to add the remote server.

{% highlight bash %}
nano .git/config
{% endhighlight %}

Add this to the file:

{% highlight bash %}
[remote "production"]
    url = username@webserver:/home/nh/website.git
{% endhighlight %}

That's it! Now you have set up your deployment! To deploy your jekyll changes is now as easy as this:

{% highlight bash %}
git push production
{% endhighlight %}

- - -

## Make jekyll fly

<blockquote>
This is the fastest site I've ever built.
</blockquote>

<center>
    <figure class="half">
        <a href="/assets/images/2014-12-05/before.png"><img src="/assets/images/2014-12-05/before.png" alt=""></a>
        <a href="/assets/images/2014-12-05/after.png"><img src="/assets/images/2014-12-05/after.png" alt=""></a>
        <figcaption>before and after</figcaption>
    </figure>
</center>

### Optimizing the web-server
Since I wanted to optimize my server I looked for a site which would allow me to test my servers performance and maybe also give me hints, than I found [pingdom](http://tools.pingdom.com/fpt/#!/dG49JO/http://blog.niklas-heer.de) which is a really good tool to test your site!

First I installed [Googles Pagespeed][pagespeed] on my CentOS machine which was a [fairly easy process](http://www.tecmint.com/install-mod_pagespeed-website-optimizer-for-apache-in-rhel-centos-and-fedora/).

Now I needed some optimization of my servers cache, for this I needed to use the ```mod_expires``` module of my apache installation.<br>
I made a new file ```/etc/httpd/conf.d/expires.conf``` with the following content:
{% highlight apache %}
ExpiresActive On
ExpiresByType image/gif "access plus 1 month"
ExpiresByType image/png "access plus 1 month"
ExpiresByType image/jpeg "access plus 1 month"
ExpiresByType text/css "access plus 1 month"
ExpiresByType text/javascript "access plus 1 month"
ExpiresByType application/x-javascript "access plus 1 month"
ExpiresByType application/x-shockwave-flash "access plus 1 month"
{% endhighlight %}

After that I edited my DNS entry to use [CloudFlare][cloudflare] which I *highly* recommend to you!

Now I have a really fast Apache web-server with caching and [CloudFlare][cloudflare] enabled.

### Optimizing pictures
You can make images smaller by using [image_optim][image_optim]! This is a great tool and fairly simple to install:

{% highlight bash %}
gem install image_optim image_optim_pack
{% endhighlight %}

If you want the full suit you also need to do this on ArchLinux:

{% highlight bash %}
yaourt -S pngout
sudo npm install -g svgo
{% endhighlight %}

After that you can simply go to the directory in which you stored your pictures and let [image_optim][image_optim] run through all subdirectories and files recursively with this command:

{% highlight bash %}
# WARNING: This could take a while!
image_optim -r .
{% endhighlight %}

- - -

## Hiding the clutter

I have made an ```.htaccess``` file for this reason, but since I have the opportunity to simply change the DocumentRoot to ```_site``` I did that instead!<br>
Maybe it will help you!

{% gist niklas-heer/f1392572c9f0469f2133 %}



[pagespeed]: https://developers.google.com/speed/pagespeed/module
[cloudflare]: https://www.cloudflare.com
[image_optim]: https://github.com/toy/image_optim
[github]: https://github.com/
[gitlab]: https://about.gitlab.com/