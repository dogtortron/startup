
Henlo this is your test study guide

# Resolve Conflicts
Follow this [Instruction](https://github.com/webprogramming260/.github/blob/main/profile/essentials/gitHub/gitHub.md#handling-merge-conflicts)

# AWS Account

Before we get started with anything else, you need to create an account with Amazon Web Services (AWS). You want to do this as soon as possible as you will need it for much of the work in this course and it might take some time to authorize your account.

There are lots of other great vendors out there, but AWS is by far the leader in the space and so it is good for you to get experience with them. Follow these instructions on how to an [account with AWS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). When you create your account make sure you remember your account ID so that you can use it when you log in to the AWS browser console.

## What is this going to cost you?

There is no cost to create an account with AWS, you only pay for what you use, and in many cases they will give you a significant starting credit, and [some services are free](https://aws.amazon.com/free) for a short period of time or monthly usage. The services we are going to use include the following:

| Service        | Purpose                              | Estimated Cost (subject to change)                                                                                     |
| -------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| EC2            | Server                               | t3.nano $0.0052 an hour ($3.50/month), t3.micro $0.0104 an hour ($7.00/month), t3.small $0.0208 an hour ($14.00/month) |
| EC2 Elastic IP | Keep your IP address between reboots | First one is free if you keep it associated with a running server. $0.0052 an hour otherwise.                          |
| Route 53       | Domain name                          | $3/year for `click` TLD. More for others                                                                               |
| Route 53       | DNS records                          | $0.50 a month for each root domain                                                                                     |
|                |                                      | Estimated total: `$15` - `$50` for the course. Much cheaper than a textbook.                                           |

There are lots of ways to get free usage of services. For example, as of when this was written, you can get a 750 hours a month, for the first 12 months, of a Linux t2.micro server instance.

# The Console

📖 **Deeper dive reading**: [MDN Command line crash course](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line)

Before the creation of graphical user interfaces, all computing systems were simple console environments consisting as of a prompt for inputting a command and the display of the command output. All of the original programming tools ran as console application. The console tradition is still actively used by professional developers and most programming tools execute within a console window.

Also known as the command line, shell, or terminal, the console window is an essential web development tool. The console provides access to the file system and allows for the execution of command line applications.

There are many console applications that you can chose from. All operating systems come with a default console, but you will probably want to install one in order to get the best experience. Here is an example of [Warp](https://www.warp.dev/) running on a Mac.

![Warp](warp.png)

## Make sure you have a console application

In order for you to successfully use the console for web programming it must be [POSIX](https://en.wikipedia.org/wiki/POSIX) compliant. POSIX compliance means that it supports a standard set of console commands. Both Mac and Linix support POSIX. That means any necessary console commands will work on those operating systems.

## Getting a console application for Windows

If you are using Microsoft Windows you can get a reasonable approximation of a POSIX compliant console by installing [Git Bash](https://git-scm.com/download/win). When installing use all the default settings.

Once it is installed, hit the Windows button on your keyboard, and type `Git Bash`. This should open a console window that looks something like the following. Make sure you look for the `Git Bash` icon so that you don't accidentally use an non-POSIX compatible console application.

![Git Bash](gitBash.jpg)

⚠ Do not use `Git Command`, `cmd`, or `Powershell`. That will not work for the commands and scripts we run in this class.

You can use Windows Subsystem for Linux (WSL) (e.g Ubuntu on Windows) for your work in this class, but you must be very careful to do all of your work actually within WSL. Don't download files to your Windows partition and then access them from WSL. It is suggested that you use `Git Bash` instead of WSL, unless you are really familiar with WSL.

### Testing your console application

Once you have a acceptable console application on your development computer, open it up and make sure you can run a simple POSIX compliant command such as `printf 'hello\n'`.

![Console printf](consolePrintf.jpg)

If this displays `hello` then you are on the right track. If that doesn't work then you are using a console application that is not POSIX compliant. For example, Windows Powershell will not work.

## Viewing the file system

One of the primary purposes of a console application is to view the files on the computer. The files on a computer are organized into a tree structure of nodes called directories. At any given point in time your console is located at one of the directories in the file system. You can see which directory you are in with the `pwd` (present working directory) command.

```sh
➜  pwd

/Users/student/byu//webprogramming260
```

You can list all of the files in the directory with `ls` (list files). Most command line applications take parameters that are specified after you type the application name. For example, `ls` can list all files (even hidden ones) in a long format if you provide the parameter `-la`.

```sh
➜ ls -la

total 16
-rw-r--r--  1 lee  staff   1.0K Nov 19 08:47 LICENSE
-rw-r--r--  1 lee  staff    82B Nov 19 08:47 README.md
drwxr-xr-x  4 lee  staff   128B Nov 19 08:48 profile
drwxr-xr-x  4 lee  staff   128B Nov 19 08:47 react
```

## Executing commands

The other primary purpose of the console is to execute commands. You already did this in the previous section when you executed commands for working with the file system. However, console commands can perform many different operations. Here are some basic commands that you show experiment with.

- **echo** - Output the parameters of the command
- **cd** - Change directory
- **mkdir** - Make directory
- **rmdir** - Remove directory
- **rm** - Remove file(s)
- **mv** - Move file(s)
- **cp** - Copy files
- **ls** - List files
- **curl** - Command line client URL browser
- **grep** - Regular expression search
- **find** - Find files
- **top** - View running processes with CPU and memory usage
- **df** - View disk statistics
- **cat** - Output the contents of a file
- **less** - Interactively output the contents of a file
- **wc** - Count the words in a file
- **ps** - View the currently running processes
- **kill** - Kill a currently running process
- **sudo** - Execute a command as a super user (admin)
- **ssh** - Create a secure shell on a remote computer
- **scp** - Securely copy files to a remote computer
- **history** - Show the history of commands
- **ping** - Check if a website is up
- **tracert** - Trace the connections to a website
- **dig** - Show the DNS information for a domain
- **man** - Look up a command in the manual

You can also chain the input and output of commands using special characters

- `|` - Take the output from the command on the left and _pipe_, or pass, it to the command on the right
- `>` - Redirect output to a file. Overwrites the file if it exists
- `>>` - Redirect output to a file. Appends if the file exists

For example, you can list the files in a directory, pipe it into `grep` to search for files created in Nov, and then pipe that into `wc` to count the number of files found with a date of Nov.

```
ls -l | grep ' Nov ' | wc -l
```

There are also keystrokes that have special meaning in the console.

- `CTRL-R` - Use type ahead to find previous commands
- `CTRL-C` - Kill the currently running command

# VI commands

The following short list of commands should allow you to do most of what you will ever want to do.

| keystroke | meaning                                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `:h`      | help                                                                                                                                           |
| `i`       | enter insert mode. This will allow you to type and delete text. Use ESC to exit insert mode. No other commands will work while in insert mode. |
| `u`       | undo                                                                                                                                           |
| `CTRL-r`  | redo                                                                                                                                           |
| `gg`      | go to beginning of file                                                                                                                        |
| `G`       | go to end of file                                                                                                                              |
| `/`       | search for text that you type after /                                                                                                          |
| `n`       | next search match                                                                                                                              |
| `N`       | previous search match                                                                                                                          |
| `v`       | visually select text                                                                                                                           |
| `y`       | yank or copy selected text to clipboard                                                                                                        |
| `p`       | paste clipboard                                                                                                                                |
| `CTRL-wv` | Split window vertically                                                                                                                        |
| `CTRL-ww` | Toggle windows                                                                                                                                 |
| `CTRL-wq` | Close current window                                                                                                                           |
| `:e`      | Open a file. Type ahead available. If you open a directory you can navigate it in the window                                                   |
| `:w`      | write file (save)                                                                                                                              |
| `:q`      | quit. Use `:q!` to exit without saving                                                                                                         |

# Git

![Git Icon](essentialsGitIcon.png)

[Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds), the creator of Linux, was fed up with the proprietary version control software that he was using to track the code for the Linux kernel and so over a weekend he built Git, the world's most popular version control system.

![Linus Torvalds](linusTorvalds.jpg)

> “Talk is cheap. Show me the code.”
>
> — Linus Torvalds

## Installing Git

Before we can talk about Git you need to make sure it is installed in your development environment. Open a console and type `git --version`.

```sh
➜  git --version
git version 2.32.0 (Apple Git-132)
```

If you do not see something like that, then you need to follow these [instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install Git.

## What is Git?

Git provides two valuable functions. First, it allows you to track versions of files in a directory. Second, it allows you to clone all of those versions to a different location, usually to a different computer. We are going to focus on tracking versions in this instruction and cover cloning repositories when we talk later about GitHub.

You can track file versions of any files in a directory by initializing Git for that directory. You can do this right now by creating a new directory in a console window and initializing it as a Git repository.

```sh
➜  mkdir playingWithGit
➜  cd playingWithGit
➜  git init
```

If you list all files in the directory you will see that you now have a hidden directory named `.git`.

```sh
➜  ls -la
total 0
drwxr-xr-x   3 lee  staff    96 Dec  1 22:59 .
drwxr-xr-x+ 54 lee  staff  1728 Dec  1 23:00 ..
drwxr-xr-x   9 lee  staff   288 Dec  1 22:59 .git
```

The `.git` directory is where all of the versions get stored. Now use the `echo` command to create a file so that we can see how versioning works. After creating the new file, use `git status` to tell you what git is doing.

```sh
➜ echo hello world > hello.txt
➜ git status

On branch master
No commits yet
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hello.txt

nothing added to commit but untracked files present (use "git add" to track)
```

Git status tells you that it detects a new file named `hello.txt`, but it isn't currently tracking versions for that file. To begin tracking versions you need to add it. Usually you track all files in a repository directory and so you can tell Git to track everything that it doesn't know about with `git add .`. Follow this with another call to `git status`.

```sh
➜  git add .
➜  git status

On branch master
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   hello.txt
```

Now Git tells us that it has `staged` the file `hello.txt` and it is ready to be committed as a version in the repository. We commit a version with the `commit` command. We always want to have a meaningful comment about the version we are committing and so we use the `-m` parameter to provide a message that will live with the version. Follow this with another call to `git status`.

```sh
➜  git commit -m "initial draft"
[master (root-commit) d43b07b] initial draft
 1 file changed, 1 insertion(+)
 create mode 100644 hello.txt

➜  git status
On branch master
nothing to commit, working tree clean
```

Congratulations! You have just committed your first file to a Git repository. It is important to note that we were only working with a single file in this example. However, a commit can represent multiple files. You just need to add them all before you execute the commit. Also, note that the point of the stage (add) step, is so that you can commit some files while still leaving other modified file out of the commit.

Let's make an edit to our file and commit it again. This time we will tell Git that we want to add all the tracked modified files to our commit by including the `-a` parameter along with our message parameter.

```sh
➜  echo goodbye world > hello.txt

➜  git commit -am "changed greeting to reflect the present mood"

[master e65f983] changed greeting to reflect the present mood
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Now that we have a couple versions in our repository we can view the versions with the `git log` command.

```sh
➜  git log

commit e65f9833ca8ee366d0d9c1676a91b1a977dab441 (HEAD -> master)
Author: Lee
Date:   Thu Dec 1 23:32:22 2022 -0700

    changed greeting to reflect the present mood

commit d43b07b8890f52defb31507211ba78785bf6dccf
Author: Lee
Date:   Thu Dec 1 23:29:11 2022 -0700

    initial draft
```

This shows both commits with the associated comments.

## Commit SHA

Every commit has a unique identifier that is generated by hashing the file along with the timestamp using the SHA hashing algorithm. You can always refer to a specific commit in your version history by using its SHA. For example, if we want to temporarily switch back to a previous version to see what it contains we can use the `checkout` command. You only need to provide the first few characters of the SHA.

```sh
➜  git checkout d43b07b8890f

Note: switching to 'd43b07b8890f'.
HEAD is now at d43b07b initial draft

➜  cat hello.txt
hello world
```

The above output omits a big message saying that you are no longer looking at the latest version, but the important thing is that you can see that we are now looking at our old version. To get back to the top of the version chain, use the `checkout` command and reference the branch name, which is by default `master`.

```sh
➜  git checkout master
Previous HEAD position was d43b07b initial draft
Switched to branch 'master'

➜  cat hello.txt
goodbye world
```

Now we are back to our latest version.

The following diagram shows how your commits move from your working directory, to staging them for a commit, and then committing them to a repository.

![Git stage](essentialsGitStage.jpg)

A commit is a full snapshot of what was staged from your directory at the time of the commit. That means all of the files contained in the commit were reverted when you executed the checkout command. Since we only had one file in our commit, it looks like we are only flipping that file around, but basically you can think of it as a time machine for the entire directory.

## Diff

Most of the time you don't want to reverse back to an earlier commit. Instead you just want to compare the differences between commits. We can do that with the `diff` command. You can specify two SHAs that you would like to compare, or you can use the HEAD variable which points to the top of the commit change. To refer to earlier commits you just add `~` and the numerical distance from head that you want to reference. In this case we will compare HEAD and HEAD~1.

```sh
➜  git diff HEAD HEAD~1
```

```diff
diff --git a/hello.txt b/hello.txt
index 3b18e51..eeee2af 100644
--- a/hello.txt
+++ b/hello.txt
@@ -1 +1 @@
-hello world
+goodbye world
```

You can see that we made a change to `hello.txt` by removing `hello world` and adding `goodbye world`.

## Branches

Git supports the ability to branch your code. This allows you to work on variations of the code while still allowing progress on the main branch. For example, if you wanted to work on a new feature named `A` without interrupting work on the master branch, you would use the `git branch A` command and start working on the `A` branch with the `git checkout A` command. Now commits can be down to both the master and the `A` branch. When you want to combine the work done on both branches you us checkout the master branch and execute `git merge A`. If you decide you want to abandon the new feature then you just don't ever merge it back into the master branch.

Here is a demonstration of this working on the visualization tool provided by [git-school.github.io](https://git-school.github.io/visualizing-git/).

![Branches](essentialsBranching.gif)

## Commit often

You will be required to have at least 4 commits for each project that you submit in order to get full credit. Commonly, this will be an initial commit that contains empty project files, followed by commits at each functional milestone, and then a final commit for the working project. Committing your code often is an important practice for you to develop. It protects you from losing your work, allows access from anywhere, makes it so you can quickly share changes, reduces conflicts with your peers, and enables you to efficiently explore different possibilities. This also enables others to review the progression of your development efforts in order to prove the originality of your work.

Remember to make meaningful commit messages that describe the **what** and **why** of the changes made. Here is a [good post](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/) on how make meaningful commit messages.

## Binary files

You can store any type of file in Git, but be aware that if you store large binary files, such as images or videos, you are storing a copy of that file each time you make a change to it. For example, suppose you use Git to track the changes you make to a video production project. Every time you save a change to your 10 GB video file you store a complete copy of the file. That means 10 commits of the video file will store 100 GB of data in your repository.

## VS Code and Git

Knowing how to use Git from the console is a very valuable skill. Git offers a wide variety of functionality such as creating branches of the repository, temporarily stashing changes, and cloning repositories to other machines.

However, by using a tool like VS Code you can hide all of the complexity of the command line and use a visual interface instead.

Here we see VS Code, with the GitLens extension installed, looking at the directory we have been working in. On the left you see all the commits we have previously created. We can edit our `hello.txt` file and VS Code will automatically detect the change and set it up for us to commit. VS Code will even put a marking on the left side of the edited text to show us what line we have changed. We can click on the staged file, in the commit area, and see the differences before we commit. Since they look good, we add a comment, and press commit. The new commit immediately shows up in our list of commits. We can use the visual diff again to click through all of the previous versions.

![VS Code Git](essentialsVSCodeGit.gif)

Underneath the covers, the GitLens extension is running Git commands just like we did on the command line, but using a visual tool makes working with versions much easier. Take some time and play with adding files, modifying them, committing, and diffing. You want to get to the point where this is second nature so that you can easily experiment and make mistakes, knowing that with Git, you can always easily recover.

# GitHub

![GitHub logo](essentialsGitHubLogo.png)

🔑 **Required reading**:

- [GitHub create a repo](https://docs.github.com/en/get-started/quickstart/create-a-repo)
- [GitHub cloning a repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [GitHub personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

When we introduced `Git`, we said that Git provides two things, 1) Version tracking in a repository, and 2) the ability to clone a copy of the repository to a different location. You can clone repositories between computers used by your development team, but the management of cloning repositories is much easier when you use a cloud based service such as `GitHub`.

GitHub was launched in 2008 by a small group of developers that wanted to make code collaboration easy. GitHub was acquired by Microsoft in 2018 for $7.5 billion. Since its beginning as a simple web application for cloning and storing Git repositories, GitHub has added functionality for hosting websites, supporting community pull requests, tracking issues, hosting codespaces, running continuous deployment processes, managing projects, and even AI driven code generation.

We are going to use GitHub for three things.

1. Hosting all of this instruction. Because it is hosted on GitHub you can generate pull requests when you see things that need improvement.
1. Publicly hosting your project repositories. This creates a backup copy of your code, demonstrates your progress with your commit history, allows for reviews of your code, and makes it so you can collaborate with your peers.
1. Keeping notes about what you have learned and things you want to remember.

## Creating a GitHub account

If you do not already have a GitHub account then go and [create one now](https://github.com). GitHub provides a free version of their services that will more than cover your usage in this class. Chances are that once you start using GitHub you will use this account for many years to come, both for personal and professional projects.

## Creating and cloning a repository

While you can create a repository in your development environment using `git init` and then connect it to an upstream repository on GitHub, it is always easier to create your repository first on GitHub and then clone it to your development environment. That way your repositories are automatically linked to each other.

To create a repository in GitHub, log into your account, select the `Repositories` tab, and press `New repository`. You then specify a unique repository name, give a description, indicate that you want it to be public, add a default README.md file, and choose a license.

![GitHub create repository](essentialsGitHubCreateRepo.jpg)

Every repository in GitHub has a unique URL assigned to it. Assuming the repository is public, anyone with the URL can clone it to their development environment. A repository clone is an exact copy of the repository including all of the commits, comments, and SHAs. It also configures the clone to know what the remote source is so that you can use Git commands to keep them in sync as changes are made.

![GitHub clone](essentialsGitHubClone.jpg)

You clone a repository by providing the GitHub repository's URL as a parameter to the `git clone` command from in a console window. You can get a copy of the URL from the repository's GitHub page and clicking on the green `Code` button, and then clicking on the copy button next to the HTTPS url.

![GitHub clone URL](essentialsGitUrlButton.jpg)

When you clone a repository it is placed in a subdirectory named with the name of the repository. So make sure you are in the directory where you keep all of your source repositories before you run the command.

```sh
➜  git clone https://github.com/webprogramming260/startup-example.git

Cloning into 'startup-example'...
remote: Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (4/4), done.

➜  cd startup-example
```

## Making changes

You can now make changes to the files in the repository and commit those changes. As you create new commits you want to push those changes back up to the GitHub clone of the repository so that the repositories are are in sync with each other. This is done with the `push` Git command. Once you have pushed the new commits then your peers who have cloned the repository can pull the commits down using the `pull` Git command.

![GitHub pull](essentialsGitHubPull.jpg)

The following demonstrates console commands for making a change to a `test.md` file, committing it, and then pushing it up to GitHub. Of course you can also do this using the Git interface of VS Code.

```sh
➜  printf "\nChange from my development environment!\n" >> test.md

➜  git add test.md

➜  git commit -am "update(notes) thoughts about startup applications"

➜  git push
```

This is the pattern that you want to make a reflexive part of your development process.

1. Pull the repository's latest changes from GitHub (`git pull`)
1. Make changes to the code
1. Commit the changes (`git commit`)
1. Push the changes to GitHub (`git push`)

⚠ Note: The first time you make a push request to a repository Git will ask you how you want to identify yourself and what credential (e.g. password) to use in order to authenticate with GitHub. You will need to create a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and provide that as your password.

```sh
*** Please tell me who you are

Run
  git config --global user.email "you@example.com"
  git config --global user.name "Your name"
```

Make sure you use the email that you provided for your GitHub account.

After pushing changes GitHub, you then view the changes on GitHub with your browser. In the example above, you would see the changes to the `test.md` file. You can also edit and commit changes directly from GitHub. When looking at a repository file on GitHub you will see a little pencil in the top right hand corner of the file. If you press that you will enter edit mode. You use that to modify the file and then commit the changes with an appropriate comment.

![GitHub edit](essentialsGitHubEdit.jpg)

Now that there is a commit that GitHub has that you do not have in your development environment. If we run the `fetch` Git command, you will get the latest information about the changes on GitHub without actually changing your local repository. We then run the `status` Git command to see the differences between the clones and see that we are missing a commit. You can pull it down using the `pull` Git command. You can also use the Git functionality in VS Code to view the status and sync up your repository.

```sh
➜  git fetch
➜  git status
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)

➜  git pull
Updating d13a9ce..cafe81a
Fast-forward
 test.md | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)
```

After running the pull command, your development clone and the GitHub clone are now the same.

## Handling merge conflicts

By pushing and pulling often, everyone keeps an up to date copy of the repository. This is important so that you don't run into merging problems caused by two peers modifying the exact same code. Merging only becomes something you have to deal with when two people modify the exact same line of code. However, when you have two peers working together you are always going to have a merge conflict at some point in time and so let's discuss how to handle this.

We can simulate a merge conflict by editing a line in a file and committing the file in your development environment, and before pushing that change, modifying the same line using GitHub. Now, run `fetch` and `status` again in your console.

```sh
➜  git fetch
➜  git status
Your branch and 'origin/main' have diverged,
and have 1 and 1 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)
```

This shows that the cloned repositories have diverged from each other. Normally this is fine and we can just push and pull the different commits, but if we do that this time we will get an error because the exact same line was changed in the two different commits.

```sh
➜  git pull

Auto-merging test.md
CONFLICT (content): Merge conflict in test.md
Automatic merge failed; fix conflicts and then commit the result.
```

We now need to resolve the merge conflict that it says has happened with our `test.md` file. If you are using VS Code with the GitLens extension installed it will visually walk you through this process. However, so you can understand what is going on, we will do this using the console. The first step is to open up `test.md` in an editor. You will see that git has injected lines that highlight where the conflict is. Both your local change and the change made on GitHub are included.

```diff
An example startup application

Change from my development environment!

Change from GitHub

<<<<<<< HEAD
Conflict change made in development environment
=======
Conflict change made in GitHub
>>>>>>> b9f4c53c91eff509993d7291e60148f903827de0
```

We resolve the conflict by modifying the file to remove the textual conflict delimiters and modifying the file to keep the changes we want. When we are done editing, our file contains what we want from both commits.

```md
# startup-example

An example startup application

Change from my development environment and from GitHub
```

Now that the conflict is resolved we commit our resolution and push up the result.

```sh
➜  git commit -am "merge(notes) combined both edits"
➜  git push
```

If you go look at the file again on GitHub you will see the additional commit in the history and the result of our merge in the file content.

## README.md

Keeping notes of what you have learned and things that you want to remember is an essential step for accelerating your web programming skills. GitHub supports the inclusion of a file with the special name `README.md` in the root of your repository. The `README.md` file is displayed in GitHub when you view your repository. This file uses `Markdown` syntax. If you have not used Markdown before, then take some time to [learn how to use it](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax). For this course you will use your startup application's README.md file to describe the modifications and alterations that you make to your startup.

You will also create another Markdown file named `notes.md` to track what you have learned in the course. You can use anything that you put in your notes.md file when taking the midterm or final.

## Forks

A GitHub fork provides the ability to create a copy of a GitHub repository. Usually you `fork a repo` to get a copy of an open source code base that you want to experiment with, or contribute to. A fork is similar to cloning a repository to your development environment, but it clones to GitHub instead. Then then pull the fork down to your development environment to work on it. The fork maintains a link to the upstream (original) repository that allows you to easily pull down updates and merge them with your fork. A fork also allows you to create a pull request in order to push suggested changes to the original repository.

If you have never forked a repository before you should go find an open source project that interests you. For example, here the [Dad Jokes API](https://github.com/DadJokes-io/Dad_Jokes_API). This simple web service provides an endpoint to get a joke. Consider forking this repository in order to experiment with how it works. Don't worry too much about what the code is doing. That will make more sense as the class goes on.

![GitHub fork](essentialsGitHubFork.jpg)

It would be awesome if we can increase the fork count for `Dad Jokes API` into the hundreds. Also make sure you push the `Star` button to show that you like the repo. Let's blow KegenGuyll's mind!

## Pull requests

📖 **Deeper dive reading**:

- [GitHub Pull Requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub pulls from forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

GitHub allows you to create a fork of any repository on GitHub. You just push the `fork` button from the repository's GitHub page. You can then make modifications to the repository fork and push the changes as a pull request. This notifies the original repository's owner that a request is being made to enhance the original repository. The owner can review your changes and if appropriate commit the changes into the original. This is how open source communities manage development from a volunteer group of global developers.

In this class, if you notice something in the instruction that needs to be enhanced, feel free to fork the repo, and make a pull request. This will give you experience with this practice and improve the instruction for others at the same time. Plus your name will be included as a contributor. How cool is that!

# Development and production environments

When working on a commercial web application, it is critical to separate where you `develop` your application, from where the `production` release of your application is made publicly available. Often times there are more environments than this, such as staging, internal testing, and external testing environments. If your company is seeking third party security certification (such as SOC2 compliance) they will require that these environments are strictly separated from each other. A developer will not have access to the production environment in order to prevent a developer from nefariously manipulating an entire company asset. Instead automated integration processes, called continuous integration (`CI`) processes, checkout the application code, lint it, build it, test it, stage it, test it more, and then finally, if everything checks out, pushes the application to the production environment, and notifies the different departments in the company of the release.

![Complex deployment](essentialsDeploymentComplex.jpg)

For our work, you will use and manage both your `development` (your personal computer) and `production` (your AWS server) environments. However, you should never consider your production environment as a place to develop, or experiment with, your application. You may shell into the production environment to configure your server or to debug a production problem, but the deployment of your application should happen using an automated CI process. For our CI process, we will use a very simple console shell script.

![Simple deployment](essentialsDeploymentSimple.jpg)

## Deployment

The advantage of using an automated deployment process is that it is reproducible. You don't delete a file, or misconfigure something with an accidental keystroke. Also, having a automated script encourages you to iterate quickly because it is so much easier to deploy your code. You can add a small feature, deploy it out to production, and get feedback within minutes from your users.

Our deployment scripts change with each new technology that we have to deploy. Initially, they just copy up a directory of HTML files, but soon they include the ability to modify the configuration of your web server, run transpiler tools, and bundle your code into a deployable package.

You run a deployment script from a console window in your development environment with a command like the following.

```sh
./deployService.sh -k ~/prod.pem -h yourdomain.click -s simon
```

The `-k` parameter provides the credential file necessary to access your production environment. The `-h` parameter is the domain name of your production environment. The `-s` parameter represents the name of the application you are deploying (either `simon` or `startup`).

This will make more sense as we gradually build up our technologies but we can discuss our simon-service deployment script as an example of what they will do. You can view the [entire file here](https://github.com/webprogramming260/simon-service/blob/main/deployService.sh), but we will explain each step below. It isn't critical that you deeply understand everything in the script, but the more you do understand the easier it will be for you to track down and fix problems when they arise.

The first part of the script simply parses the command line parameters so that we can pass in the production environment's security key (or PEM key), the hostname of your domain, and the name of the service you are deploying.

```sh
while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployService.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying $service to $hostname with $key\n"
```

Next the script copies all of the applicable source files into a distribution directory (`dist`) in preparation for copying that directory to your production server.

```sh
# Step 1
printf "\n----> Build the distribution package\n"
rm -rf dist
mkdir dist
cp -r application dist
cp *.js dist
cp package* dist
```

The target directory on your production environment is deleted so that the new one can replace it. This is done by executing commands remotely using the secure shell program (`ssh`).

```sh
# Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i $key ubuntu@$hostname << ENDSSH
rm -rf services/${service}
mkdir -p services/${service}
ENDSSH
```

The distribution directory is then copied to the production environment using the secure copy program (`scp`).

```sh
# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r -i $key dist/* ubuntu@$hostname:services/$service
```

We then use `ssh` again to execute some commands on the production environment. This installs the node packages with `npm install` and restarts the service daemon (`PM2`) that runs our web application in the production environment.

```sh
# Step 4
printf "\n----> Deploy the service on the target\n"
ssh -i $key ubuntu@$hostname << ENDSSH
cd services/${service}
npm install
pm2 restart ${service}
ENDSSH
```

Finally we clean up our development environment by deleting the distribution package.

```sh
# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf dist
```

Can you imagine if you had to do all of that by hand every time? You would dread deploying and would most likely make several time consuming mistakes during the process.

A deployment script exists for each of the Simon projects and you can use them, as is, for your startup application as long as you are doing similar types of deployment actions.

If you want to learn more about shell scripting you can [read this tutorial](https://ryanstutorials.net/bash-scripting-tutorial/bash-script.php). Shell scripting is a powerful tool for automating common development tasks and is well worth adding to your bucket of skills.

