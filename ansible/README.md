<<<<<<< HEAD
Put your ssh public key in the .ssh/authorized_key file on the server
---------------------------------------------------------------------

=======
>>>>>>> 665bb2f39f1de46a6a69a93eb7db377191d66ea9
Configure the hosts into the /etc/ansible/hosts
-----------------------------------------------

into this file set the ip address of the host like this:

[luduBackend]
your.ip.adress.

[luduFrontend]
your.ip.adress.

<<<<<<< HEAD
Change the group, owner in luduBackend/tasks/main.yml
-----------------------------------------------------

Line 6,7, change it according to the user who's going to run the script

=======
>>>>>>> 665bb2f39f1de46a6a69a93eb7db377191d66ea9
CMD to run the ansible playbook
-------------------------------

Go to the ansible file and run this command:

<<<<<<< HEAD
    ./startAnsible.sh
=======
    ansible-playbook luduPlaybook.yml --ask-become-pass
>>>>>>> 665bb2f39f1de46a6a69a93eb7db377191d66ea9

/!\ set the root password of the user host after running the command