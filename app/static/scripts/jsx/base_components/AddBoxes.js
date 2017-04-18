/**
 * Created by edward on 3/19/17.
 */
const AddBoxes = React.createClass({
    sumBoxes() {
        let sum = 0;
        let boxes = this.props.boxes;
        Object.keys(boxes).map((key)=>{
           if(key != 'name')
               sum += boxes[key].value;
        });
        console.log(sum);
        return sum;
    },
    render() {
        let boxes = this.props.boxes;
        let name = this.props.boxes.name;
        return (
            <div className="flex-container">
                <div className="flex-item small-item">
                    <input type="number" disabled={true} value={this.sumBoxes()}
                        aria-describedby={name} style={{width: 50}}/>
                    <span id={name} className="help-block">Total</span>
                </div>
                <div className="flex-item small-item">=</div>
                {Object.keys(boxes).map((label,index)=>{
                    if(label != 'name') {
                        let edit = boxes[label].edit;
                        let change = boxes[label].change;
                        let helpName = boxes.name + "_" + label;
                        let value = boxes[label].value;
                        return (
                            <div className="flex-item flex-container">
                                <div className="flex-item">
                                    <input data-name={label} type="number" disabled={!edit} onChange={edit? change: null}
                                        value={value}
                                        aria-describedby={helpName} style={{width: 50}}/>
                                    <span id={helpName} className="help-block">{label}</span>
                                </div>
                                {Object.keys(boxes)[index+1]
                                    ? <div className="flex-item">+</div>
                                    : ''
                                }
                            </div>
                        );
                    }

                })}
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