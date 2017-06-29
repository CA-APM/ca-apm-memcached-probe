/**
 * Copyright (c) 2015 CA. All rights reserved.
 *
 * This software and all information contained therein is confidential and proprietary and
 * shall not be duplicated, used, disclosed or disseminated in any way except as authorized
 * by the applicable license agreement, without the express written permission of CA. All
 * authorized reproductions must be marked with this language.
 *
 * EXCEPT AS SET FORTH IN THE APPLICABLE LICENSE AGREEMENT, TO THE EXTENT
 * PERMITTED BY APPLICABLE LAW, CA PROVIDES THIS SOFTWARE WITHOUT WARRANTY
 * OF ANY KIND, INCLUDING WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL CA BE
 * LIABLE TO THE END USER OR ANY THIRD PARTY FOR ANY LOSS OR DAMAGE, DIRECT OR
 * INDIRECT, FROM THE USE OF THIS SOFTWARE, INCLUDING WITHOUT LIMITATION, LOST
 * PROFITS, BUSINESS INTERRUPTION, GOODWILL, OR LOST DATA, EVEN IF CA IS
 * EXPRESSLY ADVISED OF SUCH LOSS OR DAMAGE.
 */

var agent = require('../agent');
var proxy = require('../proxy');
var util = require('util');
var logger = require("../logger.js");

var commands = [
   'get',
   'set',
   'add',
   'touch',
   'gets',
   'getMulti',
   'replace',
   'append',
   'prepend',
   'incr',
   'decr',
   'del',
   'command',
   'connect'
];


module.exports = function (memcached) {

    var debug = logger.isDebug();
    logger.info('loading memcached probe');

    commands.forEach(function(cmd) {
        if (debug) {
            logger.debug('instrumenting memcached.' + cmd);
        }

        proxy.before(memcached.prototype, cmd, function (obj, args, storage) {
            var eventNameFormatted = 'memcached.' + cmd;
            var ctx = storage.get('ctx');
            var command;
            var eventArgs = {};

            if (cmd == 'connect') {
                eventArgs = { 'server' : args[0] };
//                command = ctx.memcachedCommand;
//            } else if (cmd == 'command') {
//                var query = args[0]();
            }

            //on start of execution, send 'start-trace' event
            ctx = agent.asynchEventStart(ctx, eventNameFormatted, eventArgs);
            storage.set('ctx', ctx);

            proxy.callback(args, -1, function (obj, args, storage) {
                if (ctx != null) {
                    var eventArgs = {};
                    var errorObject = {};

                    // check if error is passed to callback
                    if (args[0] != null) {
                        errorObject.class= 'Memcached Error';
                        errorObject.msg = args[0].message;
                    }

                    //on callback invocation, send 'end-trace' event
                    ctx = agent.asynchEventDone(ctx, eventNameFormatted, eventArgs, errorObject);
                    storage.set('ctx', ctx);
                }
            }, function (obj, args) {
                //var errorObject = agent.checkAndSetErrorObject(args, 'MongodbError');
                if (ctx != null) {
//                    if (debug) {
//                        logger.debug('%s[%d %d %d]: callback', eventNameFormatted, ctx.txid, ctx.lane, ctx.evtid);
//                    }
                    ctx = agent.asynchEventFinish(ctx);
                }
                else {
                    if (debug) {
                     logger.debug('%s - no context: callback', eventNameFormatted);
                     logger.debug((new Error('No context')).stack);
                    }
                }
            });
        });
    });
};
