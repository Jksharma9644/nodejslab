var env = process.env.NODE_ENV || 'development';

if(env==='development'){
    process.env.PORT =3000;
    // process.env.MONGODB_URI ='mongodb://admin:admin@ds064299.mlab.com:64299/oms';
    process.env.MONGODB_URI='mongodb://localhost:27017/User';
}else if(env==='test'){
    process.env.PORT =3000;
    // process.env.MONGODB_URI ='mongodb://admin:admin@ds064299.mlab.com:64299/oms'
    process.env.MONGODB_URI ='mongodb://localhost:27017/User';
    
}