Put your ssh public key in the .ssh/authorized_key file on the server
---------------------------------------------------------------------

Configure the hosts into the /etc/ansible/hosts
-----------------------------------------------

into this file set the ip address of the host like this:

[luduBackend]
your.ip.adress.

[luduFrontend]
your.ip.adress.

Change the group, owner in luduBackend/tasks/main.yml
-----------------------------------------------------

Line 6,7, change it according to the user who's going to run the script

CMD to run the ansible playbook
-------------------------------

Go to the ansible file and run this command:

    ./startAnsible.sh

/!\ set the root password of the user host after running the command