# Memcached Node.js Probe

# Description
This node.js probe gets metrics and transaction traces for calls to [memcached](https://memcached.org/).

## Short Description
This node.js probe gets metrics and transaction traces for calls to memcached.

## APM version
Tested with APM 10.5.1, 10.5.2.

## Supported third party versions
https://github.com/3rd-Eden/memcached, version 2.2.2

## Limitations
The `Backends|memcached on <server>_<port>` metric does only reflect the time spent in the `connect()` method of memcached. The total time for each backend call is reported under the `Memcached|<method>` metrics, e.g. `Memcached|get:Average Response Time (ms)`.

## License
[Eclipse Public License (EPL) 1.0](LICENSE)

# Installation Instructions

## Prerequisites
[Install the node.js agent](https://docops.ca.com/ca-apm/10-5/en/implementing-agents/node-js-agent)

## Dependencies
APM 10.5.1, 10.5.2.

## Installation
1. Copy `memcached.js` to `node_modules/ca-apm-probe/lib/probes`. If you installed the `ca-apm-probe` locally in your node project directory the path is relative to that. If you installed the `ca-apm-probe` globally the path is relative to `/usr/lib` or `/usr/local/lib` depending on your operating system and node version.
2. Copy `pbd/memcached.pbd` to `core/config` of your CA APM Collector agent and add a line `memcached.pbd` to `nodejs-typical.pbl`.

## Running Your node.js Application
See [Install and Run the Node.js Probe Agent](https://docops.ca.com/ca-apm/10-5/en/implementing-agents/node-js-agent/install-the-node-js-agent/install-and-run-the-node-js-probe-agent).

## Metric Description
The node.js probe for memcached provides the following metrics:
* [Blamepoint metrics](https://docops.ca.com/ca-apm/10-5/en/using/apm-metrics/blamepoint-metrics) under `Memcached|<method>` for the following memcached methods:
   * get
   * set
   * add
   * touch
   * gets
   * getMulti
   * replace
   * append
   * prepend
   * incr
   * decr
   * del
   * command
* Backend [blamepoint metrics](https://docops.ca.com/ca-apm/10-5/en/using/apm-metrics/blamepoint-metrics) under `Backends|memcached on {server}` for the actual calls to the memcached server(s), i.e. the method `connect`.

Error events will be created for errors returned by the methods mentioned above and the corresponding `Errors Per Interval` metric will be incremented.


## Debugging and Troubleshooting
[Set the log level of the node.js agent](https://docops.ca.com/ca-apm/10-5/en/implementing-agents/node-js-agent/configure-apm-for-node-js#ConfigureAPMforNode.js-ConfigureNode.jsProbeAgentPropertiesUsingtheconfig.jsonFile) to `DEBUG`.


## Support
This document and associated tools are made available from CA Technologies as examples and provided at no charge as a courtesy to the CA APM Community at large. This resource may require modification for use in your environment. However, please note that this resource is not supported by CA Technologies, and inclusion in this site should not be construed to be an endorsement or recommendation by CA Technologies. These utilities are not covered by the CA Technologies software license agreement and there is no explicit or implied warranty from CA Technologies. They can be used and distributed freely amongst the CA APM Community, but not sold. As such, they are unsupported software, provided as is without warranty of any kind, express or implied, including but not limited to warranties of merchantability and fitness for a particular purpose. CA Technologies does not warrant that this resource will meet your requirements or that the operation of the resource will be uninterrupted or error free or that any defects will be corrected. The use of this resource implies that you understand and agree to the terms listed herein.

Although these utilities are unsupported, please let us know if you have any problems or questions by adding a comment to the CA APM Community Site area where the resource is located, so that the Author(s) may attempt to address the issue or question.

Unless explicitly stated otherwise this extension is only supported on the same platforms as the APM core agent. See [APM Compatibility Guide](http://www.ca.com/us/support/ca-support-online/product-content/status/compatibility-matrix/application-performance-management-compatibility-guide.aspx).

### Support URL
https://github.com/CA-APM/ca-apm-memcached-probe/issues

# Contributing
The [CA APM Community](https://communities.ca.com/community/ca-apm) is the primary means of interfacing with other users and with the CA APM product team.  The [developer subcommunity](https://communities.ca.com/community/ca-apm/ca-developer-apm) is where you can learn more about building APM-based assets, find code examples, and ask questions of other developers and the CA APM product team.

If you wish to contribute to this or any other project, please refer to [easy instructions](https://communities.ca.com/docs/DOC-231150910) available on the CA APM Developer Community.

## Categories
Database Frameworks


# Change log
Changes for each version of the extension.

Version | Author | Comment
--------|--------|--------
1.0 | CA Technologies | First version of the extension.
