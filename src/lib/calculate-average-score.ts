export function calculateAverageScore(
    answers: {
        score:number|null
    }[]
){

    if(answers.length===0){
        return 0;
    }

    const total = answers.reduce(
        (sum,item)=>sum+(item.score??0),
        0
    );

    return Math.round(total/answers.length);
}