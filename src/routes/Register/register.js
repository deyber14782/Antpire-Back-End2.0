const {Router}=require('express')
const firebase=require('firebase/app')
const auth=require('firebase/auth')
const {getAuth}=require('firebase/auth')
const {getFirestore,addDoc,collection}=require('firebase/firestore')

const router=Router()

const firebaseConfig = {
    apiKey: "AIzaSyD9Ugtsq_Ts_FbGLl3sXYFnPFUOwsAs5S0",
    authDomain: "antpire-original.firebaseapp.com",
    databaseURL: "https://antpire-original-default-rtdb.firebaseio.com",
    projectId: "antpire-original",
    storageBucket: "antpire-original.appspot.com",
    messagingSenderId: "342233726581",
    appId: "1:342233726581:web:f498bd394cecb1645c423c",
    measurementId: "G-GDBJRFMR3F"
};

const app=firebase.initializeApp(firebaseConfig)
const db=getFirestore(app)



router.post('/signup',async(req,res)=>{

    var names=req.body.names
    var lastNames=req.body.lastNames
    var age=req.body.age
    var email=req.body.email
    var salary=req.body.salary
    var password=req.body.password
    var frequencySalary=req.body.frequencySalary

    auth2=getAuth()

    auth.createUserWithEmailAndPassword(auth2,email,password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            try{
                const docRef = addDoc(collection(db, "Users",user.uid,'Private_Data'), {
                    Names:names,
                    Last_Names:lastNames,
                    Age:age,
                    Email:email,
                    Salary:salary,
                    FrequencySalary:frequencySalary,
                });
                auth.sendEmailVerification(auth2.currentUser)
                return res.status(200).json({message:"Registro exitoso"})
            }
            catch(error){
                return res.status(400).json({message:error})
            }

            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return res.status(400).json({message:errorMessage})
        });
    
})


module.exports=router