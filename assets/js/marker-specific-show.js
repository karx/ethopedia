
AFRAME.registerComponent('marker-specific-show', {
    schema: {
        marker: { type: 'string', default: '' },
        current_marker: { type: 'string', default: '_' },
        rot_transitions: { type: 'string', default: '' },
        dev: {type: 'boolean', default: false}
    },
    multiple: true,

    init: function () {
        console.log(this.data.dev);
        if (this.data.dev) {
            this.el.setAttribute("visible",false);
        }
        console.log(`Event Specific for ${this.data.marker} `);
    },

    update: function () {
        var data = this.data;  // Component property values.
        var el = this.el;  // Reference to the component's entity.
        console.log(`Child data: ${data}`);
        console.log(`Current Marker Data from DOM: ${this.el.getAttribute('current_marker')}`);

        if (data.marker == data.current_marker) {
            // This will log the `message` when the entity emits the `event`.
            el.setAttribute("visible",true);
            console.log(`showing entity`);
        } else {

            // `event` not specified, just log the message.
            el.setAttribute("visible",true);
            console.log(`hiding entity`);
        }
    },

    tick: function () {
        console.log('tiickng');
        var data = this.data;  // Component property values.
        var el = this.el;  // Reference to the component's entity.
        var pos = el.getAttribute('position');
        var rot = el.getAttribute('rotation') || '0 0 0';
        let directionalOffset = 0.1; // positive 1 if scrolling down | negative -1 if scolling up
        let t_vh_mid = document.documentElement.clientHeight * (0.5 + directionalOffset);
        let markers_ids = data.markers.split('|').map(x => x.trim());

        console.log(`Marker Count = ${markers_ids.length}`);


        let markers_distances = markers_ids.map((x) => { return (Math.abs(calcMidFromOffsets(x) - t_vh_mid)) });

        //DEBUG LINE
        document.getElementById('center-marker').style.top = t_vh_mid + 'px';

        let minState = Math.min(...markers_distances);

        console.log(`Distances = ${markers_distances} | MIN = ${minState}`);

        for (let i = 0; i < markers_distances.length; i++) {
            let eachMarkerDistance = markers_distances[i];
            if (Math.abs(minState - eachMarkerDistance) < 0.001) {
                posOfMarker = data.pos_transitions.split('|')[i].trim().split(',');
                pos = tinyMoveTo(posOfMarker[0], posOfMarker[1], posOfMarker[2], pos, 0.3);

                rotOfMarker = data.rot_transitions.split('|')[i].trim().split(',');
                rot = tinyMoveTo(rotOfMarker[0], rotOfMarker[1], rotOfMarker[2], rot, 2, 3);
                break;
            }
        }

        el.setAttribute('position', pos);
        el.setAttribute('rotation', rot);
    }
});

function tinyMoveTo(x, y, z, pos, step = 0.01, lc = 0.75) {
    pos.x = tinyMoveSingleTo(x, pos.x, step, lc);
    pos.y = tinyMoveSingleTo(y, pos.y, step, lc);
    pos.z = tinyMoveSingleTo(z, pos.z, step, lc);
    return pos;
}

function tinyMoveSingleTo(dest_x, x, step, lc) {
    if (Math.abs(x - dest_x) > lc) {
        if (x > dest_x) {
            x -= step;
        } else if (x < dest_x) {
            x += step;
        }
    } else {
        x = dest_x;
    }
    return x;
}

function calcMidFromOffsets(target) {
    let xlMatch = document.getElementById(target);

    var viewportOffset = xlMatch.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    var bottom = viewportOffset.bottom;
    var right = viewportOffset.right;
    // console.log(target);
    // console.log(`T:${top} L:${left} B:${bottom} R:${right}`);
    return (top + bottom) / 2;
}