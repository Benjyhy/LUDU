Configure the hosts into the /etc/ansible/hosts
-----------------------------------------------

into this file set the ip address of the host like this:

[luduBackend]
your.ip.adress.

[luduFrontend]
your.ip.adress.

CMD to run the ansible playbook
-------------------------------

Go to the ansible file and run this command:

    ansible-playbook luduPlaybook.yml --ask-become-pass

/!\ set the root password of the user host after running the command