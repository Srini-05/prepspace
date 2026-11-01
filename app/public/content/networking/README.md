# Linux Networking: Interview Questions and Answers

**A progressive networking guide for Linux administration, development, and security interviews.**

Start with the fundamentals, then expand each question to review the answer. The examples use Linux tools and focus on systems and networks you own or are authorized to administer.

## Contents

| Section | Topics |
|---|---|
| [1. Network Fundamentals](#level-1-network-fundamentals) | Models, packets, addressing, and subnets |
| [2. Protocols and Services](#level-2-protocols-and-services) | TCP, UDP, DNS, DHCP, NAT, and ports |
| [3. Linux Network Commands](#level-3-linux-network-commands) | Interfaces, routes, sockets, and name resolution |
| [4. Troubleshooting](#level-4-network-troubleshooting) | A practical layered diagnosis method |
| [5. Application Networking and Security](#level-5-application-networking-and-security) | HTTP, TLS, SSH, firewalls, and proxies |
| [6. Advanced Topics](#level-6-advanced-networking-topics) | MTU, packet capture, performance, and containers |
| [Reference Tables](#reference-tables) | Commands, ports, and troubleshooting flow |
| [Practice Labs](#linux-networking-labs) | Hands-on exercises |

> **Practice safely:** Use a Linux VM, local container, or network you administer. Do not capture traffic or test connectivity on systems without permission.

## Level 1: Network Fundamentals

<details>
<summary>1. What is a computer network?</summary>

**Answer:** A computer network is a group of connected devices that exchange data using agreed protocols. Linux networking uses interfaces, addresses, routes, and protocol implementations to send and receive that traffic.

</details>

<details>
<summary>2. What is the difference between a network protocol and a network service?</summary>

**Answer:** A protocol defines how systems communicate, such as TCP, UDP, or DNS. A service is an application or function that uses protocols, such as an SSH server listening for client connections.

</details>

<details>
<summary>3. What is the OSI model?</summary>

**Answer:** The OSI model is a conceptual seven-layer framework for describing network communication: Physical, Data Link, Network, Transport, Session, Presentation, and Application. It helps organize troubleshooting, even though real systems often use the TCP/IP model instead.

</details>

<details>
<summary>4. What are the layers of the TCP/IP model?</summary>

**Answer:** A common four-layer version is Link, Internet, Transport, and Application. Ethernet and Wi-Fi operate at Link; IP operates at Internet; TCP and UDP at Transport; and protocols such as HTTP and DNS at Application.

</details>

<details>
<summary>5. What is a network packet?</summary>

**Answer:** A packet is a unit of data carried across a network. It includes payload and protocol metadata such as source and destination addresses; transport protocols add information such as ports.

</details>

<details>
<summary>6. What is a MAC address?</summary>

**Answer:** A MAC address identifies a network interface on a local link, typically at the link layer. Routers forward IP packets between networks; the link-layer frame and destination MAC address are updated for each hop.

</details>

<details>
<summary>7. What is the difference between a MAC address and an IP address?</summary>

**Answer:** A MAC address is used to deliver frames on a local network link. An IP address identifies a network-layer endpoint and supports routing between networks. They serve different layers and purposes.

</details>

<details>
<summary>8. What is an IP address?</summary>

**Answer:** An IP address identifies an interface at the Internet layer so packets can be delivered across networks. IPv4 addresses are 32 bits; IPv6 addresses are 128 bits.

</details>

<details>
<summary>9. What is the difference between IPv4 and IPv6?</summary>

**Answer:** IPv4 uses 32-bit addresses, commonly written as four decimal octets, such as `192.0.2.10`. IPv6 uses 128-bit hexadecimal addresses, such as `2001:db8::10`, providing a much larger address space and other protocol changes.

</details>

<details>
<summary>10. What is a subnet mask or prefix length?</summary>

**Answer:** It identifies which bits of an IP address represent the network portion and which identify hosts within that network. For example, `/24` means the first 24 bits are the prefix; the equivalent common IPv4 mask is `255.255.255.0`.

</details>

<details>
<summary>11. What does CIDR notation such as <code>192.168.1.0/24</code> mean?</summary>

**Answer:** CIDR notation combines a network address with its prefix length. `192.168.1.0/24` describes the IPv4 block whose first 24 bits are the network prefix. The usable host range depends on address family and network conventions.

</details>

<details>
<summary>12. What is a default gateway?</summary>

**Answer:** A default gateway is the next-hop router a host uses when no more-specific route matches the destination. On Linux, inspect it with `ip route`; it is often shown on a line beginning with `default via`.

</details>

<details>
<summary>13. What is the difference between a public and private IP address?</summary>

**Answer:** Public addresses are globally routable on the Internet. Private IPv4 ranges are reserved for internal networks and are not routed publicly by default. Private hosts commonly use NAT to access external networks.

</details>

## Level 2: Protocols and Services

<details>
<summary>14. What is the difference between TCP and UDP?</summary>

**Answer:** TCP provides a connection-oriented byte stream with sequencing, acknowledgments, and retransmission. UDP sends independent datagrams without TCP's delivery and ordering guarantees. The application chooses the transport that fits its needs.

</details>

<details>
<summary>15. What happens during a TCP three-way handshake?</summary>

**Answer:** The client sends `SYN`, the server responds with `SYN-ACK`, and the client replies with `ACK`. This establishes connection state and synchronizes initial sequence numbers before application data is exchanged.

</details>

<details>
<summary>16. How does TCP connection termination differ from the handshake?</summary>

**Answer:** TCP normally closes a connection through coordinated `FIN` and `ACK` exchanges so each direction can close. A reset (`RST`) aborts a connection rather than performing the usual graceful shutdown.

</details>

<details>
<summary>17. What is a port in networking?</summary>

**Answer:** A port is a transport-layer number that helps a host deliver TCP or UDP traffic to the correct application endpoint. A port number alone does not guarantee that a service is running or reachable.

</details>

<details>
<summary>18. What is a socket?</summary>

**Answer:** A socket is an operating-system communication endpoint. A network connection is commonly described by protocol and endpoint details such as source and destination IP addresses and ports.

</details>

<details>
<summary>19. What is the difference between a listening port and an established connection?</summary>

**Answer:** A listening socket is waiting for incoming connections or datagrams on a local address and port. An established TCP connection represents an active communication session with a peer.

</details>

<details>
<summary>20. What is DNS?</summary>

**Answer:** The Domain Name System maps names to records such as IP addresses and mail exchangers. Applications use DNS so people and services can refer to hosts by names instead of remembering addresses.

</details>

<details>
<summary>21. What is the difference between a DNS recursive resolver and an authoritative server?</summary>

**Answer:** A recursive resolver looks up answers on behalf of a client, using cache and querying other DNS servers as needed. An authoritative server provides definitive records for the DNS zones it serves.

</details>

<details>
<summary>22. What does a DNS TTL mean?</summary>

**Answer:** Time to live specifies how long a DNS response may be cached before it should be queried again. A cached answer can remain in use until its TTL expires, so DNS changes may not appear immediately everywhere.

</details>

<details>
<summary>23. What is DHCP?</summary>

**Answer:** DHCP automatically provides network configuration to clients, commonly including an IP address, prefix, default gateway, and DNS resolvers. A lease is granted for a defined period and may be renewed.

</details>

<details>
<summary>24. What is NAT?</summary>

**Answer:** Network Address Translation changes address information as packets pass through a device. A common use is translating multiple private IPv4 hosts to one public address; port translation can distinguish their connections.

</details>

<details>
<summary>25. What is ICMP, and what is it used for?</summary>

**Answer:** ICMP carries network control and diagnostic messages. Tools such as `ping` use ICMP echo messages, while routers may use other ICMP messages to report network conditions.

</details>

<details>
<summary>26. What is ARP?</summary>

**Answer:** Address Resolution Protocol maps an IPv4 address to a link-layer address on the local network. IPv6 uses Neighbor Discovery instead of ARP for related local-link functions.

</details>

## Level 3: Linux Network Commands

<details>
<summary>27. How do you list network interfaces on Linux?</summary>

**Answer:** Use `ip link` to list interfaces and link state. Use `ip addr` to include assigned addresses. The older `ifconfig` may be absent or deprecated on modern distributions.

```bash
ip link
ip addr
```

</details>

<details>
<summary>28. How do you check whether a Linux network interface is up?</summary>

**Answer:** Run `ip link show dev <interface>` and inspect the state and flags. `UP` indicates the interface is administratively enabled; carrier and address configuration are separate conditions to check.

</details>

<details>
<summary>29. How do you inspect Linux IP addresses and routes?</summary>

**Answer:** Use `ip addr` to inspect interface addresses and `ip route` to inspect IPv4 routing. For IPv6 routes, use `ip -6 route`.

```bash
ip addr
ip route
ip -6 route
```

</details>

<details>
<summary>30. What does <code>ip route get</code> do?</summary>

**Answer:** It asks the Linux routing subsystem which route it would use for a destination. For example, `ip route get 203.0.113.10` can show the selected interface, next hop, and source address without sending application traffic.

</details>

<details>
<summary>31. What does the Linux command <code>ss</code> do?</summary>

**Answer:** `ss` displays socket information. `ss -lnt` lists listening TCP sockets using numeric addresses and ports; `ss -lun` lists UDP sockets. Process details may require elevated permissions.

</details>

<details>
<summary>32. How do you find which local Linux process is listening on a port?</summary>

**Answer:** Use `sudo ss -ltnp 'sport = :8080'` for a TCP listener on port 8080. `sudo lsof -i :8080` is another option if `lsof` is installed. Check only services on systems you administer.

</details>

<details>
<summary>33. What does <code>dig</code> show when troubleshooting DNS on Linux?</summary>

**Answer:** `dig` shows the DNS question, response status, answer records, and the responding server. Use `dig example.com A` for an IPv4 address record or `dig example.com AAAA` for an IPv6 address record.

</details>

<details>
<summary>34. How do you check which DNS resolver a Linux system uses?</summary>

**Answer:** Inspect the resolver configuration, often through `/etc/resolv.conf`, and use distribution-specific tools such as `resolvectl status` on systems managed by systemd-resolved. The file may be generated or point to a local stub resolver.

</details>

<details>
<summary>35. What does the Linux command <code>getent hosts</code> do?</summary>

**Answer:** It looks up a host using the system's configured name-service mechanisms, which can include DNS and local sources such as `/etc/hosts`. It is useful for testing the lookup path applications commonly use.

</details>

<details>
<summary>36. What do <code>ping</code> and <code>tracepath</code> test?</summary>

**Answer:** `ping` tests ICMP echo reachability and reports round-trip timing when replies are permitted. `tracepath` discovers information about the path and hop behavior. Firewalls and network policy can limit or block either tool, so a failed test is not definitive proof that a host is down.

</details>

<details>
<summary>37. How do you use <code>curl</code> to test an HTTP service?</summary>

**Answer:** `curl -i http://localhost:8080/health` makes an HTTP request and displays response headers and body. `curl -v` adds connection and protocol details; avoid exposing sensitive headers or credentials in shared logs.

</details>

<details>
<summary>38. What does <code>nmcli</code> do on Linux?</summary>

**Answer:** `nmcli` is a command-line client for NetworkManager. It can display devices and connections, for example `nmcli device status`; configuration changes should be made only when you understand their effect on connectivity.

</details>

## Level 4: Network Troubleshooting

<details>
<summary>39. What is a good Linux network troubleshooting sequence?</summary>

**Answer:** Start locally and move outward: check interface/link state, IP configuration, routes, local gateway, remote IP reachability, DNS, target port, application response, and firewall or proxy behavior. Use evidence from each check to choose the next step.

</details>

<details>
<summary>40. A Linux host has no IP address. What would you check?</summary>

**Answer:** Check interface state with `ip link`, addresses with `ip addr`, and NetworkManager status if applicable. Verify the intended static configuration or DHCP lease, cable/Wi-Fi connectivity, VLAN, and DHCP service. Avoid changing a remote interface without a recovery path.

</details>

<details>
<summary>41. A Linux host has an IP address but cannot reach another subnet. What would you inspect?</summary>

**Answer:** Inspect `ip route`, verify the default or specific route, and test the gateway. Then check upstream routing, network ACLs, and firewalls. A correct local IP alone does not guarantee a valid path to remote networks.

</details>

<details>
<summary>42. A Linux host can reach an IP address but not a hostname. What is a likely cause?</summary>

**Answer:** Name resolution is a likely issue. Check the configured resolver, query with `dig`, and compare with `getent hosts` to test the system's lookup path. Also consider search domains and cached responses.

</details>

<details>
<summary>43. DNS works, but a web application is unavailable. What should you check next?</summary>

**Answer:** Confirm the resolved address is expected, test the specific port and protocol, verify that the server process is listening, and inspect application and firewall logs. Use `curl -v` to see whether failure occurs during connection, TLS negotiation, or the HTTP response.

</details>

<details>
<summary>44. Why can <code>ping</code> fail while an application still works?</summary>

**Answer:** ICMP may be blocked or deprioritized while TCP or UDP application traffic is allowed. Test the actual application protocol and port instead of treating ping as a universal availability check.

</details>

<details>
<summary>45. Why can <code>ping</code> work while an application fails?</summary>

**Answer:** Ping only indicates that ICMP echo traffic received a reply. The application can still be stopped, listening on another interface or port, blocked by a firewall, or failing at its protocol or configuration layer.

</details>

<details>
<summary>46. How do you distinguish a connection timeout from connection refused?</summary>

**Answer:** A timeout means no successful response arrived within the allowed time, often because of filtering, routing, or an unresponsive host. Connection refused usually means the destination was reachable but no service accepted the connection, or a device actively rejected it. Exact behavior depends on the network path.

</details>

<details>
<summary>47. What does a successful TCP connection prove, and what does it not prove?</summary>

**Answer:** It proves a TCP connection was established to that address and port at that moment. It does not prove the application is healthy, authenticated, authorized, or returning correct data; test the application protocol and expected response too.

</details>

<details>
<summary>48. How can you troubleshoot a Linux network issue without changing the system?</summary>

**Answer:** Gather read-only evidence first: `ip addr`, `ip route`, `ss`, resolver configuration, `dig`, `getent`, and relevant logs. Record timestamps and exact errors, then propose a minimal change and obtain approval before modifying routes, interfaces, firewall rules, or services.

</details>

## Level 5: Application Networking and Security

<details>
<summary>49. What is the difference between HTTP and HTTPS?</summary>

**Answer:** HTTP is an application protocol for web communication. HTTPS is HTTP carried over TLS, which can provide encryption, server authentication, and integrity when certificates and configuration are valid.

</details>

<details>
<summary>50. What does TLS protect?</summary>

**Answer:** TLS can encrypt data in transit, detect modification, and authenticate the server through certificates. It does not prove that an application is safe, that a user is authorized, or that data is protected after it reaches the endpoint.

</details>

<details>
<summary>51. What is a TLS certificate?</summary>

**Answer:** A TLS certificate binds an identity, such as a DNS name, to a public key and is signed by a certificate authority or another trusted issuer. Clients validate the chain, validity period, and requested hostname.

</details>

<details>
<summary>52. What is the difference between a Linux service listening on <code>127.0.0.1</code> and <code>0.0.0.0</code>?</summary>

**Answer:** `127.0.0.1` binds to the IPv4 loopback interface and is reachable only locally. `0.0.0.0` generally means listening on all IPv4 interfaces, which may expose the service to other hosts depending on routing and firewall rules.

</details>

<details>
<summary>53. What is a firewall, and how does it affect Linux networking?</summary>

**Answer:** A firewall applies rules to network traffic, often based on interface, direction, address, protocol, and port. Linux systems may use nftables directly or a manager such as UFW or firewalld. Inspect the active ruleset and distribution configuration before changing it.

</details>

<details>
<summary>54. What is the difference between a host firewall and a network firewall?</summary>

**Answer:** A host firewall runs on an individual machine and controls traffic to or from that host. A network firewall filters traffic between network segments or at a perimeter. Both can apply rules, and their policies may overlap.

</details>

<details>
<summary>55. What is a proxy server?</summary>

**Answer:** A proxy intermediates requests between a client and another service. A forward proxy commonly serves clients accessing external resources; a reverse proxy accepts requests on behalf of backend services and may handle TLS termination or routing.

</details>

<details>
<summary>56. What is the difference between a load balancer and a reverse proxy?</summary>

**Answer:** A reverse proxy forwards client requests to backend servers. A load balancer distributes requests across multiple backends to improve availability or capacity. Many products perform both roles.

</details>

<details>
<summary>57. What does a Linux firewall rule allowing inbound TCP port 22 mean?</summary>

**Answer:** It permits matching inbound TCP traffic to port 22, commonly used by SSH. The exact exposure depends on the rule's interface, source restrictions, connection state, and other firewall and network controls.

</details>

<details>
<summary>58. How should SSH networking be secured on a Linux host?</summary>

**Answer:** Limit SSH access to required users and trusted network paths, prefer key-based authentication, disable direct root login where appropriate, keep the service patched, and monitor authentication logs. Preserve an authorized recovery path before changing remote access rules.

</details>

## Level 6: Advanced Networking Topics

<details>
<summary>59. What is MTU?</summary>

**Answer:** Maximum Transmission Unit is the largest network-layer packet a link can carry without fragmentation at that layer. Different link technologies and tunnels can have different MTUs; mismatches may cause some connections or larger transfers to fail.

</details>

<details>
<summary>60. What is Path MTU Discovery?</summary>

**Answer:** Path MTU Discovery determines the largest packet size that can travel end-to-end without fragmentation. If required control messages are blocked, connections may exhibit symptoms such as small requests working while larger transfers stall.

</details>

<details>
<summary>61. What is packet loss, and how can it affect an application?</summary>

**Answer:** Packet loss occurs when packets fail to reach their destination. TCP may retransmit lost data, increasing latency and reducing throughput; real-time UDP applications may experience gaps or degraded quality.

</details>

<details>
<summary>62. What is latency, and how is it different from bandwidth?</summary>

**Answer:** Latency is the time required for data to travel between endpoints, often measured as round-trip time. Bandwidth is the link's data-carrying capacity. A connection can have high bandwidth but still feel slow when latency is high.

</details>

<details>
<summary>63. What is a VLAN?</summary>

**Answer:** A Virtual LAN logically separates Layer 2 broadcast domains on shared switching infrastructure. VLAN tagging allows multiple VLANs to share a link when the endpoints and network devices are configured consistently.

</details>

<details>
<summary>64. What is a VPN?</summary>

**Answer:** A Virtual Private Network creates a protected logical connection across another network, commonly using encryption and authentication. A VPN changes the network path and may affect routes, DNS, and access policy.

</details>

<details>
<summary>65. What is a network namespace in Linux?</summary>

**Answer:** A network namespace isolates network resources such as interfaces, routes, firewall rules, and sockets. Containers commonly use namespaces to provide separate network views while sharing the host kernel.

</details>

<details>
<summary>66. What is the purpose of <code>tcpdump</code>?</summary>

**Answer:** `tcpdump` captures and displays packets visible to a selected interface, which can help diagnose network behavior. Captures may contain sensitive data, so capture only authorized traffic, minimize scope, and protect or remove capture files according to policy.

</details>

<details>
<summary>67. How do you investigate high network latency on Linux?</summary>

**Answer:** Compare latency to the local gateway and progressively more distant destinations, check loss and route changes, inspect interface counters, and look for CPU, queueing, or congestion issues. Correlate measurements with timestamps and application logs; a single ping test does not identify root cause.

</details>

<details>
<summary>68. How do Docker containers communicate with a network?</summary>

**Answer:** Container runtimes create virtual interfaces and network paths, often using bridges, NAT, and port publishing. Inspect container network configuration and host routes/firewall rules; behavior depends on the runtime and selected network mode.

</details>

<details>
<summary>69. How do you troubleshoot a Linux application that works locally but not remotely?</summary>

**Answer:** Check which address the service binds to, confirm the port is listening, inspect host firewall and upstream rules, verify routing and DNS, and test from another authorized host. A service bound only to loopback will not accept remote connections through the host's external interface.

</details>

<details>
<summary>70. How do you approach a network outage in production?</summary>

**Answer:** Establish scope and impact, identify recent changes, preserve monitoring and logs, and isolate the failing layer using read-only checks first. Communicate status, apply an approved and reversible mitigation, verify recovery, and document the root cause and follow-up actions.

</details>

## Reference Tables

### Linux Network Commands

| Command | Purpose | Example |
|---|---|---|
| `ip link` | List interfaces and link state | `ip link show` |
| `ip addr` | Show interface addresses | `ip addr show` |
| `ip route` | Show IPv4 routes | `ip route` |
| `ip -6 route` | Show IPv6 routes | `ip -6 route` |
| `ip route get` | Show selected route to destination | `ip route get 203.0.113.10` |
| `ss -lnt` | Show listening TCP sockets | `ss -lnt` |
| `ss -lun` | Show UDP sockets | `ss -lun` |
| `dig` | Query DNS records | `dig example.com A` |
| `getent hosts` | Test system host lookup | `getent hosts example.com` |
| `ping` | Test ICMP echo reachability | `ping -c 4 192.0.2.1` |
| `tracepath` | Inspect network path behavior | `tracepath example.com` |
| `curl` | Test application-layer HTTP(S) | `curl -I https://example.com` |
| `nmcli` | Inspect NetworkManager state | `nmcli device status` |
| `tcpdump` | Capture authorized network traffic | `sudo tcpdump -ni <interface>` |

### Common Ports

| Port | Protocol | Common use |
|---:|---|---|
| 22 | TCP | SSH |
| 53 | TCP/UDP | DNS (most ordinary queries use UDP; TCP is also required) |
| 67/68 | UDP | DHCP server/client for IPv4 |
| 80 | TCP | HTTP |
| 123 | UDP | NTP time synchronization |
| 443 | TCP | HTTPS over TLS; HTTP/3 commonly uses UDP 443 |
| 3306 | TCP | MySQL default |
| 5432 | TCP | PostgreSQL default |
| 6379 | TCP | Redis default |
| 8080 | TCP | Common alternate web application port, not a fixed standard |

### Layered Troubleshooting Flow

| Order | Question | Linux checks |
|---:|---|---|
| 1 | Is the interface enabled and connected? | `ip link`, interface counters, link/Wi-Fi state |
| 2 | Does it have the expected address? | `ip addr`, DHCP or static configuration |
| 3 | Is there a route to the destination? | `ip route`, `ip route get <destination>` |
| 4 | Is the local gateway reachable? | `ping <gateway>` when ICMP is permitted |
| 5 | Does name resolution work? | `dig <name>`, `getent hosts <name>` |
| 6 | Is the destination port reachable? | `ss` locally; authorized connection test from client |
| 7 | Does the application respond? | `curl -v <url>`, service logs |
| 8 | Are policy controls involved? | Host firewall, network ACL, proxy, VPN, security policy |

## Linux Networking Labs

| Lab | Exercise |
|---|---|
| Interface and route inspection | Use `ip link`, `ip addr`, and `ip route` in a Linux VM; identify the active interface and default route. |
| DNS comparison | Compare `dig example.com` with `getent hosts example.com`; explain what each result tests. |
| Local HTTP service | Start a simple development server bound to loopback, test it with `curl`, and inspect its listener with `ss`. Keep it local to the VM. |
| Local firewall review | Inspect the firewall status and existing rules in a disposable VM; document which local services are allowed before making any changes. |
| Troubleshooting simulation | In a lab, deliberately use an incorrect hostname or local port, then identify the failing layer from command output and logs. |
| Packet capture | Capture a short, authorized exchange on a lab interface with `tcpdump`; avoid credentials and unrelated traffic, and delete the capture when finished. |

## Interview Answer Framework

When answering a Linux networking question:

1. Explain the concept in plain language.
2. Name the relevant protocol or network layer.
3. Give a Linux command that provides evidence.
4. Explain what the result would mean and what you would check next.
5. Mention security, impact, and authorization before changing a production system.
