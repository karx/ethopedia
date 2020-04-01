
AFRAME.registerComponent('marker-specific-parent', {
    schema: {
        markers: { type: 'string', default: '' },
        pos_transitions: { type: 'string', default: '' },
        rot_transitions: { type: 'string', default: '' }
    },
    multiple: true,

    init: function () {
        var sceneEl = document.querySelector('a-scene');
        sceneEl.setAttribute('background', 'color: #FFF');
        sceneEl.setAttribute('vr-mode-ui', 'enabled: false');

        var stringToLog = this.data.markers;
        //   this.data.initPosZ = -10;
        this.data.initPosX = 0;
        this.data.last_state = 0;
        this.last_state_index = -1;
        console.log(stringToLog);
        console.log('hEader Phone');
    },

    update: function () {
        var data = this.data;  // Component property values.
        var el = this.el;  // Reference to the component's entity.

        if (data.event) {
            // This will log the `message` when the entity emits the `event`.
            el.addEventListener(data.event, function () {
                console.log(data.message);
            });
        } else {

            // `event` not specified, just log the message.
            console.log(data.message);
        }
    },

    tick: function () {
        // console.log('tiickng');
        var data = this.data;  // Component property values.
        var el = this.el;  // Reference to the component's entity.
        var pos = el.getAttribute('position');
        var rot = el.getAttribute('rotation') || '0 0 0';
        let directionalOffset = 0.1; // positive 1 if scrolling down | negative -1 if scolling up
        let t_vh_mid = document.documentElement.clientHeight * (0.5 + directionalOffset);
        let markers_ids = data.markers.split('|').map(x => x.trim());

        // console.log(`Marker Count = ${markers_ids.length}`);


        let markers_distances = markers_ids.map((x) => { return (Math.abs(calcMidFromOffsets(x) - t_vh_mid)) });

        //DEBUG LINE
        // document.getElementById('center-marker').style.top = t_vh_mid + 'px';

        let minState = Math.min(...markers_distances);

        // console.log(`Distances = ${markers_distances} | MIN = ${minState}`);

        for (let i = 0; i < markers_distances.length; i++) {
            let eachMarkerDistance = markers_distances[i];
            if (Math.abs(minState - eachMarkerDistance) < 0.001) {
                
                posOfMarker = data.pos_transitions.split('|')[i].trim().split(',');
                pos = tinyMoveTo(posOfMarker[0], posOfMarker[1], posOfMarker[2], pos, 0.3);

                rotOfMarker = data.rot_transitions.split('|')[i].trim().split(',');
                rot = tinyMoveTo(rotOfMarker[0], rotOfMarker[1], rotOfMarker[2], rot, 5, 3);

                if(this.last_state_index !== i) {
                    this.last_state_index = i;
                    this.updateChildWithMarkers(markers_ids[i]);
                }
                break;
            }
        }

        el.setAttribute('position', pos);
        el.setAttribute('rotation', rot);
    },
    updateChildWithMarkers :function(marker_id) {
        console.log(`Pushing updated Marker: ${marker_id}`);
        // this.el.querySelector('*').forEach((e) => e.setAttribute('current_marker', marker_id));
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
    if(!xlMatch) {
        console.log(`Got Null on target search: ${target}`);
        return 100000;
    }
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