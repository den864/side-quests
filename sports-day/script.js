let scores=[];

// Function to print current scores
function printScores(scores){
  scores.forEach(ele => console.log(`${ele.team}: ${ele.score}`));
}

// Opening Ceremony function
function OpeningCeremony(){
    console.log("Opening Ceremony Started");

    let count=0;
    // Logs a message every second for 3 seconds
    const intervalId=setInterval(()=>{
        console.log("Opening Ceremony is going on !!");
        count++;
        if(count==3){
            clearInterval(intervalId);
            // Initialize team scores
            scores=[
                {team:'red',score:0},
                {team:'green',score:0},
                {team:'blue',score:0}
            ];
            console.log("The Initial Standings are :")
            printScores(scores);

            console.log("Opening Ceremony Ended");
            console.log("--------------------------");

            // Start the 100M race after ceremony
            Race100M(scores,LongJump);
        }
    },1000)
}

// 100M Race simulation
function Race100M(scores,cb){
    console.log("100M Race Started!!");
    console.log("The Initial Standings are :");
    printScores(scores);

    setTimeout(() => {
        // Generate random race times for each team
        const time=scores.map(ele=>{
            return{
                team:ele.team,
                time:Math.floor(Math.random()*10+1)
            }
        })

        // Sort teams based on time (lower = faster)
        time.sort((a,b)=>a.time-b.time);

        // Update scores for top 2 teams
        scores.forEach(ele=>{
            if(ele.team===time[0].team){
                ele.score+=25;
            }else if(ele.team==time[1].team){
                ele.score+=10;
            }
        })

        console.log("Winner of this round is :",time[0].team);
        console.log("After this Round, Standings are:");
        printScores(scores);
        console.log("Race is Over");
        console.log("--------------------------");

        // Move to next event (Long Jump)
        cb(scores,HighJump);

    }, 3000);
}

// Long Jump simulation
function LongJump(scores,cb){
    console.log("Long Jump has Started!!");
    console.log("The Initial Standings are :")
    printScores(scores);

    setTimeout(() => {
        // Randomly select one winner
        const randomWinner=Math.floor(Math.random()*scores.length);
        scores[randomWinner].score+=25;

        console.log("Winner of this round is :",scores[randomWinner].team);
        console.log("After this Round, Standings are:");
        printScores(scores);
        console.log("Long Jump is Over");
        console.log("--------------------------");

        // Move to next event (High Jump)
        cb(scores,AwardCeremony);
    }, 2000);
}

// High Jump with user input
function HighJump(scores,cb){
    console.log("High Jump has Started!!");
    console.log("The Initial Standings are :")
    printScores(scores);

    // Ask user for winning team
    let winner=prompt("Enter Winner (blue/red/green)");

    if(!winner){
        console.log("No Input is received, so event is cancelled");
        return cb(scores);
    }

    winner=winner.trim();

    const index=scores.findIndex(ele=>ele.team===winner);

    if(index==-1){
        console.log("Entered team doesn't exist, event is cancelled");
        return cb(scores);
    }else{
        scores[index].score+=25;
    }

    console.log("Winner of this round is:",winner);
    console.log("After this Round, Standings are:");
    printScores(scores);
    console.log("High Jump is Over");
    console.log("--------------------------");

    // Move to final ceremony
    cb(scores);
}

// Final Award Ceremony
function AwardCeremony(scores){
    console.log("Award Ceremony Started!!");
    console.log("The final standings are :")
    printScores(scores);

    // Sort teams by score (highest first)
    scores.sort((a,b)=>b.score-a.score);
    console.log(`Winner is ${scores[0].team} with score ${scores[0].score}`);
}

// Start the whole event
OpeningCeremony();
