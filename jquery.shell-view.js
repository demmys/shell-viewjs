((window, $, undefined) => {
    'use strict'

    $.fn.extend({
        /*
         * Constants
         */
        classCommand: 'shell-view-command',
        classCursor: 'shell-view-cursor',
        attrBlinkTimer: 'data-shell-view-blink-timer',
        attrPrompt: 'data-shell-view-prompt',
        defaultPrompt: '$ ',
        /*
         * initialize an element to display shell view
         */
        shellView: function(prompt) {
            if(typeof(prompt) === 'undefined'){
                prompt = this.defaultPrompt;
            }
            this.append($('<span>').addClass(this.classCommand).append(prompt))
                .append($('<span>').addClass(this.classCursor).append('|'))
                .attr(this.attrPrompt, prompt);
            return this.startBlink();
        },
        /*
         * get specific child node
         */
        stdout: function() {
            return this.children('.' + this.classCommand);
        },
        cursor: function() {
            return this.children('.' + this.classCursor);
        },
        /*
         * blink cursor
         */
        startBlink: function() {
            return this.queue(() => {
                this.attr(this.attrBlinkTimer, setInterval(() => {
                    this.cursor().toggle();
                }, 500)).dequeue();
            });
        },
        stopBlink: function(cursorVisible) {
            return this.queue(() => {
                clearInterval(this.attr(this.attrBlinkTimer));
                if(cursorVisible){
                    this.cursor().show();
                } else{
                    this.cursor().hide();
                }
                this.dequeue();
            });
        },
        /*
         * control
         */
        scroll: function() {
            this.scrollTop(this.stdout().height());
        },
        /*
         * output
         */
        newLine: function() {
            return this.queue(() => {
                this.stdout().append($('<br>'));
                this.scroll();
                this.dequeue();
            });
        },
        print: function(text) {
            return this.queue(() => {
                this.stdout().append(text);
                this.scroll();
                this.dequeue();
            });
        },
        type: function(text, interval) {
            if(typeof(interval) === 'undefined'){
                interval = 100;
            }
            this.stopBlink(true);
            for(var i = 0; i < text.length; i++){
                this.print(text[i]).delay(interval);
            }
            return this.startBlink();
        },
        prompt: function(prompt) {
            if(typeof(prompt) === 'string'){
                this.attr(this.attrPrompt, prompt);
            }
            return this.newLine().print(this.attr(this.attrPrompt));
        },
        clear: function() {
            this.stdout().empty().append(this.attr(this.attrPrompt));
        },
        /*
         * interrupt
         */
        interrupt: function(callback) {
            return this.queue(() => {
                callback(this);
                this.dequeue();
            });
        }
    });
})(this, jQuery)
