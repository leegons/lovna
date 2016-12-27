/**
 * Created by leegons on 2016/12/24.
 */
"use strict";

function Lovna(it, use_pointer) {
    this.pointer = use_pointer || false;
    this.it = it;
    this.action_pos = 0;
    this.frame_idx = 0;
    this.txt = "";
    this.cur_action = false;
    this.actions = [];
}

Lovna.prototype.print = function(text, interval) {
    this.actions.push({
        action: "print",
        text: text,
        interval: interval
    });
    return this;
};
Lovna.prototype.sleep = function(time) {
    this.actions.push({
        action: "sleep",
        time: time
    });
    return this;
};
Lovna.prototype.back = function(len, interval) {
    this.actions.push({
        action: "back",
        len: len,
        interval: interval
    });
    return this;
};

var _show_frame = function(self, f, p) {
    if (self.frame_idx == f) {
        self.it.text(self.txt + (p ? "|" : " "));
        if (self.pointer) {
            setTimeout(_show_frame, 500, self, f, !p);
        }
    }
};
Lovna.prototype.show_it = function(s) {
    if (s != undefined) this.txt = s;
    this.frame_idx++;
    setTimeout(_show_frame, 0, this, this.frame_idx, this.pointer)
};

var _run_frame = function(self) {
    if (self.cur_action) {
        var c = self.cur_action;
        var n = 0;
        var s = self.txt;

        switch (c.action) {
            case "print":
                if (!c.pos) {
                    c.pos = 0;
                }
                if (c.pos >= c.text.length) {
                    self.cur_action = false;
                } else {
                    self.show_it(s + c.text.charAt(c.pos++));
                    n = c.interval;
                }
                break;

            case "sleep":
                self.cur_action = false;
                n = c.time;
                break;

            case "back":
                if (!c.pos) {
                    c.pos = 0;
                }
                if (c.pos >= c.len || s.length <= 0) {
                    self.cur_action = false;
                } else {
                    self.show_it(s.substring(0, s.length - 1));
                    c.pos++;
                    n = c.interval;
                }
                break;
        }
        setTimeout(_run_frame, n, self);

    } else if(self.action_pos < self.actions.length) {
        self.cur_action = self.actions[self.action_pos++];
        setTimeout(_run_frame, 0, self);

    } else {
        self.pointer = false;
        self.show_it();
    }
};

Lovna.prototype.run = function() {
    _run_frame(this);
};
