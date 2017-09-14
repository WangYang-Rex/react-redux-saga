require('./drag.styl')
import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import Field from './Field'


@DragDropContext(HTML5Backend)
export default class Container extends Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        let fileds = props.data;
        let hideField = props.data2;
        fileds.sort(function(x,y){
            return x.fieldOrder - y.fieldOrder
        })
        this.state = {
            cards :fileds,
            hideField : hideField
        };
    }

    moveCard(dragIndex, hoverIndex ,type) {
        const { cards, hideField } = this.state;
        let dragCard,
            data;
        if(type == "hide"){
            dragCard = hideField[dragIndex];
            console.log(dragCard)
            data = update(this.state, {
                hideField : {
                    $splice: [
                        [dragIndex, 1],
                    ],
                },
                cards: {
                    $splice: [
                        [hoverIndex, 0, dragCard],
                    ],
                }

            })
        }else{
            dragCard= cards[dragIndex];
            data = update(this.state, {
                cards: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }
            })
        }
        // 见https://facebook.github.io/react/docs/update.html

        // 保持order从小到大
        for(let i = 0; i < data.cards.length; i++ ){
            data.cards[i].fieldOrder = i
        }
        this.setState({
            cards : data.cards,
            hideField : data.hideField
        })
    }
    render() {
        const { cards , hideField} = this.state;
        return (
        <div  className="container">
            <div className="left">
                <div className="name">隐藏字段</div>
            {hideField.map((field, i) =>
                (
                    <Card
                        key={field.fieldId}
                        index={i}
                        id={field.fieldId}
                        text={field.fieldTitle}
                        isRequired={field.isRequired}
                        moveCard={this.moveCard}
                        type = 'hide'
                    />
                )
            )}
            </div>
            <div className="right">
            {cards.map((card, i) =>
                (
                    <Card
                        key={card.fieldId}
                        index={i}
                        id={card.fieldId}
                        text={card.fieldTitle}
                        isRequired={card.isRequired}
                        moveCard={this.moveCard}
                        type = 'show'
                    />
                )
            )}
            </div>
        </div>
        );
    }
}
