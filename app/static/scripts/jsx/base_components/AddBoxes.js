/**
 * Created by edward on 3/19/17.
 */
const AddBoxes = React.createClass({
    sumBoxes() {
        let sum = 0;
        let boxes = this.props.boxes;
        Object.keys(boxes).map((key)=>{
           if(key != 'name' && key != 'totalOnly')
               sum += boxes[key].value;
        });
        return sum;
    },
    makeLabel(helpName, fieldName) {
        if(fieldName.split(' ').length > 1)
            return <span id={helpName} className="help-block">
                <ul className="list-unstyled">
                    <li><sub>{fieldName.split(' ')[0]}</sub></li>
                    <li><sup>{fieldName.split(' ')[1]}</sup></li>
                </ul>
            </span>
        else
            return <span id={helpName} className="help-block"><sup>{fieldName}</sup></span>

    },
    makeInput(fieldName, index) {
        let boxes = this.props.boxes;
        let name = this.props.boxes.name;
        let boxKeys = Object.keys(boxes);
        if(fieldName != 'name') {
            let edit = boxes[fieldName].edit;
            let change = boxes[fieldName].change;
            let helpName = boxes.name + "_" + fieldName;
            let value = boxes[fieldName].value;
            return (
                <div className="flex-item flex-container flex-wrap">
                    <div className="flex-item">
                        {this.props.labelAbove
                            ? this.makeLabel(helpName, fieldName)
                            : ''
                        }
                        <input data-name={fieldName} type="number" onChange={change} disabled={!change}
                            value={value} aria-describedby={helpName} data-parent={name}
                            className={"add-box"}/>
                        {boxes[fieldName].noLabel || this.props.labelAbove
                            ? ''
                            : this.makeLabel(helpName, fieldName)}

                    </div>
                    {boxKeys[index+1]
                        ? <div className="flex-item">+</div>
                        : ''
                    }
                </div>
            );
        }

    },
    render() {
        let boxes = this.props.boxes;
        let name = this.props.boxes.name;
        let label;
        let className = this.props.className? "flex-container " + this.props.className: "flex-container flex-wrap";
        return (
            <div className={className}>
                <div className="small-item">
                    {this.props.labelAbove
                        ? <span id={name} className="help-block"><small>TOTAL</small></span>
                        : ''
                    }
                    <text aria-describedby={name} className="add-box" style={{textDecoration: "underline"}}>
                        &nbsp;&nbsp;{this.sumBoxes()}&nbsp;&nbsp;
                    </text>
                    {boxes.totalOnly || this.props.labelAbove
                        ? ''
                        : <span id={name} className="help-block"><small>TOTAL</small></span>}
                </div>
                {boxes.totalOnly
                    ? ''
                    : <div className="small-item">=</div>
                }
                {boxes.totalOnly
                    ? ''
                    : Object.keys(boxes).map((fieldName, index)=>{
                        return this.makeInput(fieldName,index);
                    })
                }
            </div>
        );
    }
});

export default AddBoxes;

/*
 {
    name: 'Initiative'
    box1: { edit: true, change: ()=>{}, value: 0},
    box2: { edit: false, value: 99},
    ...
    boxN: { edit: (true||false), value}
 }
 */