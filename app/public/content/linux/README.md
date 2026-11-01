# Linux Interview Preparation

**63 Linux Q&As | 7 learning levels | Linux commands, security, and hands-on labs**

Work through the questions in order, from Linux fundamentals to production troubleshooting. Expand each question after trying to answer it yourself.

## Contents

| Level | Focus |
|---|---|
| [1. Linux Basics](#level-1-linux-basics) | Linux, shell, paths, and first commands |
| [2. Files and Permissions](#level-2-files-directories-and-permissions) | File operations, search, ownership, and access |
| [3. Users and Processes](#level-3-users-packages-and-processes) | Accounts, packages, processes, services, and logs |
| [4. Networking](networking/README.md) | Dedicated networking concepts, commands, troubleshooting, and labs |
| [Cybersecurity Guide](cybersecurity/README.md) | Security fundamentals through operations, response, and architecture |
| [Ruby on Rails Guide](ruby-rails/README.md) | Rails concepts compared with Java, Spring Boot, and React |
| [Distributed Systems Guide](distributed-systems/README.md) | Scalability, reliability, data distribution, messaging, and transactions |
| [System Design Guide](system-design/README.md) | HLD, LLD, APIs, data, scaling, reliability, security, and cloud |
| [AI + Software Engineering Guide](ai-software-engineering/README.md) | LLMs, prompting, RAG, agents, security, and evaluation |
| [5. Bash and Text Processing](#level-5-text-processing-and-bash) | Pipes, text tools, scripts, and exit codes |
| [6. Security](#level-6-linux-security-and-investigation) | Hardening and defensive investigation |
| [7. Advanced Linux](#level-7-advanced-linux-and-production-topics) | Performance, kernel, containers, and production |
| [Reference Tables and Labs](#supplementary-reference-tables) | Commands, troubleshooting, and practice |

> **Study routine:** Try to answer each question aloud, expand it to compare your answer, then practice the related command in a Linux VM or WSL environment.
>
> **Safety:** Practice administrative or configuration-changing commands only in a disposable lab or on systems you are authorized to manage.

## Level 1: Linux Basics

<details>
<summary>1. What is Linux?</summary>

**Answer:** Linux is an open-source operating system kernel. In everyday use, “Linux” usually means a complete operating system distribution that combines the Linux kernel with system tools, libraries, package management, and applications.

</details>

<details>
<summary>2. What does an operating system do?</summary>

**Answer:** An operating system manages computer resources and provides services to programs. Linux manages processes, memory, devices, files, users, and network access.

</details>

<details>
<summary>3. What is the Linux kernel?</summary>

**Answer:** The kernel is the core of Linux. It runs in privileged mode and manages hardware resources, memory, processes, device drivers, and system calls used by applications.

</details>

<details>
<summary>4. What is a Linux distribution?</summary>

**Answer:** A distribution packages the Linux kernel with system utilities, libraries, software repositories, an installer, and default configuration. Ubuntu, Debian, Fedora, and Red Hat Enterprise Linux are examples.

</details>

<details>
<summary>5. What is the difference between a Linux kernel and a Linux distribution?</summary>

**Answer:** The kernel is the core that manages system resources. A distribution is the complete usable operating system built around that kernel, including tools and applications.

</details>

<details>
<summary>6. What is the difference between a terminal and a shell?</summary>

**Answer:** A terminal is the interface where you enter and view text. A shell, such as Bash or Zsh, interprets commands and starts programs. A terminal application normally runs a shell.

</details>

<details>
<summary>7. What does the Linux command format <code>command [options] [arguments]</code> mean?</summary>

**Answer:** The command names the program, options adjust its behavior, and arguments tell it what to operate on. For example, in `ls -la /var/log`, `ls` is the command, `-la` are options, and `/var/log` is the argument.

</details>

<details>
<summary>8. How do you identify the Linux distribution and kernel version?</summary>

**Answer:** Read `/etc/os-release` for distribution information and run `uname -r` for the kernel version. `uname -a` prints additional kernel and system details.

   ```bash
   cat /etc/os-release
   uname -r
   ```

</details>

<details>
<summary>9. What does the Linux command <code>pwd</code> do?</summary>

**Answer:** `pwd` prints the absolute path of the current working directory.

</details>

<details>
<summary>10. What does the Linux command <code>ls -la</code> do?</summary>

**Answer:** `ls` lists directory contents. `-l` shows a detailed listing, and `-a` includes hidden entries whose names begin with a dot.

</details>

<details>
<summary>11. What do <code>/</code>, <code>.</code>, <code>..</code>, and <code>~</code> mean in Linux paths?</summary>

**Answer:** `/` is the filesystem root, `.` means the current directory, `..` means the parent directory, and `~` expands to the current user's home directory. An absolute path starts at `/`; a relative path starts from the current directory.

</details>

## Level 2: Files, Directories, and Permissions

<details>
<summary>12. What does the Linux command <code>mkdir -p</code> do?</summary>

**Answer:** It creates a directory and any missing parent directories. For example, `mkdir -p project/logs/archive` creates the full directory path if it does not already exist.

</details>

<details>
<summary>13. What does the Linux command <code>touch</code> do?</summary>

**Answer:** If the file does not exist, `touch` creates an empty file. If it exists, `touch` updates its access and modification timestamps.

</details>

<details>
<summary>14. What do the Linux commands <code>cp</code> and <code>mv</code> do?</summary>

**Answer:** `cp` copies files or directories. `mv` moves a file or directory, and is also commonly used to rename it. Use `cp -r` when copying directories.

</details>

<details>
<summary>15. What do the Linux commands <code>rm</code> and <code>rmdir</code> do?</summary>

**Answer:** `rm` removes files, and `rm -r` removes a directory tree. `rmdir` removes only empty directories. Deletion may be permanent, so check the target carefully before running these commands.

</details>

<details>
<summary>16. What is the difference between <code>cat</code>, <code>less</code>, <code>head</code>, and <code>tail</code> on Linux?</summary>

**Answer:** `cat` prints file contents, `less` lets you page through a file, `head` shows the first lines, and `tail` shows the last lines. `tail -f` follows new lines as a log file grows.

</details>

<details>
<summary>17. What does the Linux command <code>find</code> do?</summary>

**Answer:** `find` searches a directory tree using criteria such as name, type, or size. For example, `find . -type f -name '*.log'` finds log files under the current directory.

</details>

<details>
<summary>18. What does the Linux command <code>grep</code> do?</summary>

**Answer:** `grep` prints lines matching a text pattern. For example, `grep -in 'error' app.log` searches case-insensitively and displays matching line numbers.

</details>

<details>
<summary>19. What do the permission characters <code>r</code>, <code>w</code>, and <code>x</code> mean in Linux?</summary>

**Answer:** They mean read, write, and execute. Permissions are listed for the file owner, the owning group, and other users. For a directory, `x` allows traversal and `r` allows listing its names.

</details>

<details>
<summary>20. How do you read the Linux permission string <code>-rwxr-xr--</code>?</summary>

**Answer:** The first character says this is a regular file. The owner has read, write, and execute; the group has read and execute; others have read only.

</details>

<details>
<summary>21. What does the Linux command <code>chmod</code> do?</summary>

**Answer:** `chmod` changes file or directory permissions. For example, `chmod 640 config.txt` gives the owner read/write, the group read, and others no access.

</details>

<details>
<summary>22. When would you use Linux permissions <code>755</code> and <code>644</code>?</summary>

**Answer:** `755` gives the owner read/write/execute and the group and others read/execute; it is common for executable scripts and directories. `644` gives the owner read/write and others read-only; it is common for ordinary files.

</details>

<details>
<summary>23. What does the Linux command <code>umask</code> do?</summary>

**Answer:** `umask` removes permissions from the defaults used when new files and directories are created. A common umask of `022` typically results in files with `644` and directories with `755` permissions.

</details>

<details>
<summary>24. What do the Linux commands <code>chown</code> and <code>chgrp</code> do?</summary>

**Answer:** `chown` changes file ownership, including owner and optionally group. `chgrp` changes the group ownership. Administrative privileges may be required.

</details>

## Level 3: Users, Packages, and Processes

<details>
<summary>25. What do the Linux commands <code>whoami</code> and <code>id</code> show?</summary>

**Answer:** `whoami` prints the effective username. `id` displays the user's UID, primary group, and supplementary group memberships.

</details>

<details>
<summary>26. What are the Linux root user and <code>sudo</code>?</summary>

**Answer:** Root is the account with unrestricted administrative privileges. `sudo` lets an authorized user run a command with elevated privileges, usually while recording who ran it. Use elevation only when needed.

</details>

<details>
<summary>27. What is the principle of least privilege in Linux?</summary>

**Answer:** Give each user, service, and process only the permissions needed for its task. This limits the damage caused by mistakes or compromised accounts.

</details>

<details>
<summary>28. What is the difference between <code>apt update</code> and <code>apt upgrade</code> on Linux?</summary>

**Answer:** `apt update` refreshes the local package index from configured repositories. `apt upgrade` installs available updates for installed packages. Review changes and follow the system's maintenance process before updating production machines.

</details>

<details>
<summary>29. What is a Linux process, and what are PID and PPID?</summary>

**Answer:** A process is a running program. PID is its process ID, and PPID is the ID of its parent process.

</details>

<details>
<summary>30. What does the Linux command <code>ps aux</code> do?</summary>

**Answer:** It prints a snapshot of processes, including users, process IDs, CPU and memory use, and command lines. Use `top` for a continuously refreshing view.

</details>

<details>
<summary>31. What is the difference between Linux <code>SIGTERM</code> and <code>SIGKILL</code>?</summary>

**Answer:** `SIGTERM` asks a process to shut down and gives it a chance to clean up. `SIGKILL` stops it immediately and cannot be caught. Try a graceful termination first, for example `kill -TERM <pid>`.

</details>

<details>
<summary>32. What is a zombie process in Linux?</summary>

**Answer:** A zombie is a process that has exited but still has a process-table entry because its parent has not collected its exit status. It is not actively running; the parent process needs to reap it.

</details>

<details>
<summary>33. How do Linux foreground and background jobs differ?</summary>

**Answer:** A foreground job uses the current terminal for input and output. A background job runs without holding the terminal, commonly started with `command &`. Shell built-ins `jobs`, `fg`, and `bg` manage jobs in that shell.

</details>

<details>
<summary>34. What does the Linux command <code>systemctl</code> do?</summary>

**Answer:** On systems using systemd, `systemctl` inspects and controls services and other units. For example, `systemctl status nginx` checks service state; starting or enabling a service changes system state and may require administrator access.

</details>

<details>
<summary>35. What is the difference between starting and enabling a Linux service?</summary>

**Answer:** Starting a service runs it now. Enabling it configures it to start automatically during boot. A service can be started without being enabled, or enabled without currently running.

</details>

<details>
<summary>36. What does the Linux command <code>journalctl -u nginx</code> do?</summary>

**Answer:** It displays journal entries associated with the `nginx` systemd unit. Use `journalctl -u nginx -b` to focus on entries from the current boot.

</details>

<details>
<summary>37. What is cron used for in Linux?</summary>

**Answer:** Cron runs scheduled commands based on a time expression. A crontab has fields for minute, hour, day of month, month, and day of week, followed by the command. Always consider the restricted environment cron jobs run with.

</details>

## Level 4: Networking and Remote Access

For networking concepts, Linux commands, troubleshooting, security, and hands-on exercises, use the dedicated [Linux Networking guide](networking/README.md).

## Level 5: Text Processing and Bash

<details>
<summary>38. What is a pipe in the Linux shell?</summary>

**Answer:** The pipe operator `|` sends one command's standard output to another command's standard input. For example, `ps aux | grep nginx` filters the process listing.

</details>

<details>
<summary>39. What do <code>&gt;</code>, <code>&gt;&gt;</code>, and <code>2&gt;</code> do in Bash?</summary>

**Answer:** `>` redirects standard output and replaces the destination file; `>>` appends standard output; and `2>` redirects standard error. `command > run.log 2>&1` sends both output streams to the same file.

</details>

<details>
<summary>40. How do <code>grep</code>, <code>sed</code>, and <code>awk</code> differ on Linux?</summary>

**Answer:** `grep` selects lines matching patterns, `sed` transforms text streams, and `awk` processes records and fields using rules. They are often combined to analyze logs.

</details>

<details>
<summary>41. What does the Linux command <code>sed 's/old/new/g' file.txt</code> do?</summary>

**Answer:** It prints the file with every matching `old` string replaced by `new` on each line. Without an in-place option, it does not modify the original file.

</details>

<details>
<summary>42. What does the Linux command <code>awk '{print $1}' file.txt</code> do?</summary>

**Answer:** It prints the first whitespace-separated field from each input line. In awk, `$1` is the first field, `NF` is the number of fields, and `NR` is the current record number.

</details>

<details>
<summary>43. What is an environment variable in Linux, and how do you set one in Bash?</summary>

**Answer:** An environment variable is a named value inherited by child processes. In Bash, `export APP_ENV=development` sets and exports it for commands launched from that shell.

</details>

<details>
<summary>44. How do Bash scripts receive command-line arguments?</summary>

**Answer:** `$0` is the script name, `$1` and `$2` are the first and second arguments, `$#` is the argument count, and `"$@"` expands to all arguments as separate values. Quote `"$@"` to preserve arguments containing spaces.

</details>

<details>
<summary>45. What does the Bash variable <code>$?</code> contain?</summary>

**Answer:** It contains the exit status of the most recently completed command. By convention, `0` means success and a nonzero value indicates an error or other condition.

</details>

<details>
<summary>46. What does <code>set -euo pipefail</code> do in a Linux Bash script?</summary>

**Answer:** `-e` exits on many unhandled command failures, `-u` treats unset variables as errors, and `pipefail` makes a pipeline fail if a command in it fails. Scripts should still handle expected failures explicitly.

</details>

## Level 6: Linux Security and Investigation

<details>
<summary>47. What is the difference between authentication and authorization in Linux?</summary>

**Answer:** Authentication verifies who a user or service is. Authorization determines what that identity is allowed to access or do, using mechanisms such as permissions, groups, and sudo policy.

</details>

<details>
<summary>48. What is Linux audit logging, and why is it useful?</summary>

**Answer:** Linux audit logging records security-relevant activity, such as authentication events, administrative actions, and changes to important files. Review the system journal and configured audit logs to support investigations; logs should be protected and forwarded where appropriate.

</details>

<details>
<summary>49. How would you investigate an unfamiliar Linux process?</summary>

**Answer:** Check its owner, PID, parent process, command line, executable path, service or scheduled-task configuration, and relevant logs using tools such as `ps`, `/proc`, and `systemctl`. Preserve evidence and follow incident-response procedures before stopping or removing it.

</details>

<details>
<summary>50. Where do you look for failed Linux login attempts?</summary>

**Answer:** Check `journalctl` and the distribution's authentication logs. Common file locations are `/var/log/auth.log` on Debian/Ubuntu and `/var/log/secure` on RHEL-family distributions; exact logging depends on configuration.

</details>

<details>
<summary>51. How would you harden a new Linux server?</summary>

**Answer:** Apply supported security updates, use named non-root accounts, restrict sudo, secure SSH, enable a suitable firewall, disable unnecessary services, set appropriate file permissions, and configure useful logs and monitoring. Make changes in a way that preserves a recovery path.

</details>

<details>
<summary>52. What is the difference between a vulnerability, a threat, and a risk in Linux security?</summary>

**Answer:** A vulnerability is a weakness, such as an unpatched service. A threat is something capable of exploiting a weakness. Risk is the potential impact and likelihood of that threat exploiting the vulnerability in the system's context.

</details>

<details>
<summary>53. What would you do first if you suspected a Linux host was compromised?</summary>

**Answer:** Follow the incident-response plan: notify the responsible team, preserve relevant evidence and logs, record the system state, and contain the host using approved procedures. Avoid ad hoc cleanup that could destroy evidence or disrupt recovery.

</details>

## Level 7: Advanced Linux and Production Topics

<details>
<summary>54. What is load average in Linux?</summary>

**Answer:** Load average is the average number of tasks runnable or waiting in uninterruptible states over 1, 5, and 15 minutes. Compare it with CPU capacity and check whether tasks are waiting on CPU, disk, or other resources; it is not simply CPU percentage.

</details>

<details>
<summary>55. How do you investigate high memory use on Linux?</summary>

**Answer:** Use `free -h` and `top` to inspect memory, then identify processes and trends. Linux uses otherwise available memory for cache, so distinguish reclaimable cache from memory pressure and swap activity.

</details>

<details>
<summary>56. What is the difference between <code>df</code> and <code>du</code> on Linux?</summary>

**Answer:** `df -h` reports filesystem-level space usage. `du -sh <path>` estimates space used by files under a path. Differences can occur when deleted files are still held open by processes or due to filesystem details.

</details>

<details>
<summary>57. What are <code>/proc</code> and <code>/sys</code> in Linux?</summary>

**Answer:** They are virtual filesystems exposing kernel and system information. `/proc` includes process and kernel details, while `/sys` exposes device and kernel-object information. Many entries are interfaces to live system state, not ordinary files on disk.

</details>

<details>
<summary>58. What is a Linux kernel module?</summary>

**Answer:** A kernel module is code that can be loaded into or removed from the running kernel, often to provide a device driver or feature. Inspect modules with `lsmod`; changes to modules should be made only when their impact is understood.

</details>

<details>
<summary>59. What is the difference between a Docker image and a container on Linux?</summary>

**Answer:** An image is a packaged, usually immutable template containing application files and metadata. A container is a running instance of an image with isolated processes and configured namespaces, resources, storage, and networking.

</details>

<details>
<summary>60. What are a Kubernetes Pod and Service?</summary>

**Answer:** A Pod is the smallest deployable Kubernetes unit and contains one or more closely related containers. A Service provides a stable network endpoint for reaching a changing set of Pods.

</details>

<details>
<summary>61. What Linux commands help you check a Ruby on Rails environment?</summary>

**Answer:** Check versions with `ruby --version`, `gem --version`, `bundle --version`, and `rails --version`. Use `bundle install` to install dependencies, `bundle exec` to run a command in the project's dependency context, and Rails commands such as `bin/rails routes` to inspect the application.

</details>

<details>
<summary>62. What is your general Linux production troubleshooting method?</summary>

**Answer:** Define the symptom and scope, check recent changes, inspect system resources, process and service state, network path, logs, permissions, and configuration. Form a testable hypothesis, make the smallest safe change, verify recovery, and document the cause and prevention.

</details>

<details>
<summary>63. How do you safely update packages on a Linux production server?</summary>

**Answer:** Review advisories and package changes, test in a representative environment, confirm backups and rollback options, schedule a maintenance window if needed, apply updates through the distribution package manager, and verify service health and logs afterward.

</details>

---

## Supplementary Reference Tables

### Linux Directories

| Path | Common purpose |
|---|---|
| `/` | Root of the filesystem hierarchy |
| `/home` | Regular users' home directories |
| `/root` | Root user's home directory |
| `/etc` | System-wide configuration |
| `/var` | Variable data, including logs and caches |
| `/tmp` | Temporary files |
| `/usr` | User-space applications, libraries, and data |
| `/dev` | Device interfaces |
| `/proc` | Virtual process and kernel information |
| `/sys` | Virtual device and kernel-object information |
| `/opt` | Optional third-party software |

### Commands to Remember

| Goal | Linux command | What to check |
|---|---|---|
| Identify OS | `cat /etc/os-release` | Distribution and release |
| Identify kernel | `uname -r` | Running kernel version |
| Show current location | `pwd` | Absolute working directory |
| List files | `ls -la` | Hidden files and permissions |
| Search files | `find . -type f -name '*.log'` | Path, type, and name |
| Search text | `grep -in 'error' app.log` | Matching lines and numbers |
| Inspect processes | `ps aux` or `top` | PID, owner, and resource use |
| Inspect service | `systemctl status <service>` | Active state and recent status |
| Inspect service logs | `journalctl -u <service> -b` | Logs from current boot |
| Check filesystem space | `df -h` | Used and available filesystem space |
| Check directory size | `du -sh <path>` | Space used beneath a path |

### Troubleshooting Checklist

| Step | Linux checks |
|---|---|
| 1. Define the symptom | What fails, where, and when? |
| 2. Check system health | `uptime`, `free -h`, `df -h`, `top` |
| 3. Check process/service | `ps`, `systemctl status <service>` |
| 4. Check dependencies | Check required access paths; see the [Networking guide](networking/README.md) for network diagnosis |
| 5. Check logs | `journalctl`, application logs under `/var/log` |
| 6. Check configuration and permissions | Inspect relevant config, owner, and mode |
| 7. Make and verify a safe change | Re-test the original symptom and monitor |
| 8. Record the outcome | Root cause, resolution, and prevention |

### Practical Linux Labs

| Lab | Practice goal |
|---|---|
| Filesystem | Create `linux-lab/{logs,scripts,configs,output}` and practice `mkdir`, `touch`, `cp`, `mv`, and `find` |
| Permissions | In a disposable Linux VM, create test users/groups and check `chmod`, `chown`, and group access |
| Log analysis | Create sample logs and use `grep`, `awk`, `sed`, `sort`, and `uniq` to summarize errors |
| Process investigation | Start a test process, inspect it with `ps` and `top`, and stop it gracefully |
| Networking | Follow the [Linux Networking labs](networking/README.md#linux-networking-labs) |
| Bash automation | Write a script that records disk, memory, service, and port checks to a timestamped report |
| Defensive audit | In a lab, report OS version, listening ports, services, login history, and SSH configuration without changing settings |

### Suggested Learning Order

| Phase | Study topics |
|---|---|
| 1. Fundamentals | Linux, shell, paths, files, directories, permissions |
| 2. Administration | Users, sudo, packages, processes, services, logs, scheduling |
| 3. Networking | Follow the [dedicated Linux Networking guide](networking/README.md) |
| 4. Automation | Pipes, redirection, text tools, Bash variables, arguments, exit codes |
| 5. Security | Least privilege, SSH, firewalls, logging, hardening, incident response |
| 6. Advanced | Performance, `/proc`, kernel modules, Docker, Kubernetes, Ruby/Rails operations |

### Final Interview Reminder

A strong Linux interview answer explains the concept, names the relevant command, interprets what the result means, and describes the next safe step. Do not memorize commands without understanding their output or impact.
