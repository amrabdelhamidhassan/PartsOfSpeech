exports.wordsEndPoint=async(req,res,next)=>
{
    try
    {   
         //defining variable for number Of Words so it can be adjusted easily if wanted to good alternative is to be sent in req body
        let numberOfWordsNeeded=10;   
        //defining variable for number Of Parts of Speech so it can be adjusted easily if wanted to add more types to the data 
        let numberOfPartsOfSpeech=4;   
        const wordList=(JSON.parse(req.data)).wordList
        //defining array to check on selected words to avoid duplication
        let selectedIndices=[];    
        //defining array to contain words results
        let results=[];         
        //defining unique array to contain parts of speech that already added 
        let restrictionsFullFilled=[]
        //defining bool to check if restrictionsFullFilled already contains all parts of speech that is needed
        let isRestrictionsFullFilled=false
        let count=0;
        while(count<numberOfWordsNeeded)
        {
            //generating random index for the wordsList 
            let randomIndex=Math.floor(Math.random()*(wordList.length-1))

            //Checking if  Word  was selected before to avoid Dublications when choosing randomly if dublicated repeat iteration 
            if(selectedIndices.includes(randomIndex)) continue;
            let randomWord=wordList[randomIndex]
            if(isRestrictionsFullFilled==false &&restrictionsFullFilled.includes(randomWord.pos)) continue
            results.push(randomWord)
            selectedIndices.push(randomIndex)
            restrictionsFullFilled.push(randomWord.pos)
            //checking if we already have at least 1 of the 4 types (noun,adjective,adverb,verb)
            if(restrictionsFullFilled.length==numberOfPartsOfSpeech)isRestrictionsFullFilled=true
            //Making Sure to Choose 1 noun 1 adjective 1 adverb 1 verb in the last cycles for unChosen Parts of speech yet so we will repeat iteration untill fullfill conditions 
            if(isRestrictionsFullFilled==false &&count==(numberOfWordsNeeded-(numberOfPartsOfSpeech-restrictionsFullFilled.length)))
            {
                continue
            }
            count+=1;
        }
        res.status(200).json({
            status: 'success',
            data: results
            
        });
    }
    catch
    {
        res.status(500).json({
            status: 'fail',
            error: "Something has gone wrong"
        });
    }
}
 exports.rankEndPoint=async(req,res,next)=>
 {
    try{
        const scoresList=(JSON.parse(req.data)).scoresList;
        let finalScore=req.body.finalScore
        let rank=0;
        for(let i=0;i<scoresList.length;i++)
        {
            if(finalScore>scoresList[i]) rank+=1;
        }
        //getting percentage and rounding to 2 
        let result=Math.round((rank/scoresList.length)* 10000) / 100;
        res.status(200).json({
            status: 'success',
            data: result
        });
    }
    catch
    {
        res.status(500).json({
            status: 'fail',
            error: "Something has gone wrong"
        });
    }
 }
