const inputEle = document.querySelector('#input');
const outputEle = document.querySelector('#output');

// const input = {
//     "id": "0001",
//     "type": "donut",
//     "name": "Cake",
//     "ppu": 0.55,
//     "batters":
//     {
//         "batter":
//             [
//                 { "id": "1001", "type": "Regular" },
//                 { "id": "1002", "type": "Chocolate" },
//                 { "id": "1003", "type": "Blueberry" },
//                 { "id": "1004", "type": "Devil's Food" }
//             ]
//     },
//     "topping":
//         [
//             { "id": "5001", "type": "None" },
//             { "id": "5002", "type": "Glazed" },
//             { "id": "5005", "type": "Sugar" },
//             { "id": "5007", "type": "Powdered Sugar" },
//             { "id": "5006", "type": "Chocolate with Sprinkles" },
//             { "id": "5003", "type": "Chocolate" },
//             { "id": "5004", "type": "Maple" }
//         ]
// };

const input = {
    "employee": {
        "name": {
            "firstName": "nara",
            "lastName": "simha"
        },
        "address": [
            {
                "street": "a",
                "city": "b",
                "state": "c"
            },
            {
                "street": "a1",
                "city": "b1",
                "state": "c1"
            }
        ]
    }
};

const formatData = () => {
    inputEle.textContent = JSON.stringify(input, undefined, 2);
    const flattened = flattenObject(input);
    outputEle.textContent = JSON.stringify(flattened, undefined, 2);
}

const flattenObject = (nestedObj, prevKeys = []) => {
    let output = [];
    for (let ele in nestedObj) {
        console.log(ele, prevKeys, Array.isArray(nestedObj[ele]), typeof nestedObj[ele]);
        if (!Array.isArray(nestedObj[ele]) && typeof nestedObj[ele] === 'object') {
            const interOutput = flattenObject(nestedObj[ele], [...prevKeys, ele]);
            console.log(interOutput);
            output = [...output, ...interOutput];
        } else {
            output.push({ key: [...prevKeys, ele], value: nestedObj[ele] })
        }
    }

    return output;
}