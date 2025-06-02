import './index.scss'

export default function Index() {
    function dragstart_handler(ev) {
        console.log("dragStart");
        // Change the source element's background color to signify drag has started
        ev.currentTarget.style.border = "dashed";
        // Add the id of the drag source element to the drag data payload so
        // it is available when the drop event is fired
        ev.dataTransfer.setData("text", ev.target.id);
        // Tell the browser both copy and move are possible
        ev.effectAllowed = "copyMove";
    }
    function dragover_handler(ev) {
        console.log("dragOver");
        // Change the target element's border to signify a drag over event
        // has occurred
        ev.currentTarget.style.background = "lightblue";
        ev.preventDefault();
    }

    function dragleave_handler(ev) {
        console.log('dragleave')
        ev.currentTarget.style.background = '#ffffff'
    }
    function drop_handler(ev) {
        console.log("Drop");
        ev.preventDefault();
        // Get the id of drag source element (that was added to the drag data
        // payload by the dragstart event handler)
        var id = ev.dataTransfer.getData("text");
        // Only Move the element if the source and destination ids are both "move"
        if (id == "src_move" && ev.target.id == "dest_move") {
            ev.target.appendChild(document.getElementById(id));
        }
            
        // Copy the element if the source and destination ids are both "copy"
        if (id == "src_copy" && ev.target.id == "dest_copy") {
            let element = document.getElementById(id);
            if (null == element) {
                return
            }
            var nodeCopy = element.cloneNode(true);
            // nodeCopy.id = "newId";
            ev.target.appendChild(nodeCopy);
        }
    }

    function dragend_handler(ev) {
        console.log("dragEnd");
        // Restore source's border
        ev.target.style.border = "solid black";
    }

    return (
        <>
            <h3>Drag and Drop: Copy and Move elements with <code>DataTransfer</code></h3>
            <div draggable='true'
              id='src_copy'
              onDragStart={dragstart_handler}
              onDragEnd={dragend_handler}
            >
                Select this element and drag to the <strong>Copy Drop Zone</strong>.
            </div>

            <div id='dest_copy'
              onDrop={drop_handler}
              onDragOver={dragover_handler}
              onDragLeave={dragleave_handler}
            ><strong>Copy Drop Zone</strong></div>

            <div draggable='true'
              id='src_move'
              onDragStart={dragstart_handler}
              onDragEnd={dragend_handler}
            >
                Select this element and drag to the <strong>Move Drop Zone</strong>.
            </div>

            <div id='dest_move'
              onDrop={drop_handler}
              onDragLeave={dragleave_handler}
              onDragOver={dragover_handler}
            ><strong>Move Drop Zone</strong></div>
        </>
    )
}