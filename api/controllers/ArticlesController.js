/**
 * ArticlesController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var utility = require('../services/archivoLog');
module.exports = {
	list:function(req, res){
        Articles.find({}).exec(function(err,articles){
            if(err){
                res.send(500,{error: 'Database Error'});
            }
        
            res.view('list',{articles:articles});
        });


    },
    add:function(req,res){
        res.view('add');
    },
    create:function(req,res){
        var n = req.body.nombre;
        var a = req.body.apellido;
        var e = req.body.edad;
        var d = req.body.direccion;
        Articles.create({nombre:n,apellido:a,edad:e,direccion:d}).exec(function(err){
            if (err){
                res.send(500,{error: 'Database Error'});
            }
            res.redirect('/articles/list');
        });
    },
    delete:function(req, res){
        Articles.destroy({id:req.params.id}).exec(function(err){
            if (err){
                res.send(500,{error: 'Database Error'});
            }
            res.redirect('/articles/list');
        });
        return false;
    },
    edit:function(req,res){
        Articles.findOne({id:req.params.id}).exec(function(err,article){
            if(err){
                res.send(500,{error:'Database Error'});
            }
            res.view('edit',{article:article});
        });
        
    },
    update:function(req,res){
        var n = req.body.nombre;
        var a = req.body.apellido;
        var e = req.body.edad;
        var d = req.body.direccion;
        Articles.update({id:req.params.id},{nombre:n,apellido:a,edad:e,direccion:d}).exec(function(err){
            if (err){
                res.send(500,{error: 'Database Error'});
            }
            res.redirect('/articles/list');
        });
    },
    crear:function(req,res){
        var params = req.allParams();
        Articles.create({nombre:params.nombre,apellido:params.apellido,edad:params.edad,direccion:params.direccion}).exec(
            function(err,respuesta){
                if(err){
                    res.send(500,{error:'Database Error'});
                }
                utility.escribirLog("CREATE");
                return res.json(respuesta);
                 
            }
            
        );
        
    },
    leer:function(req,res){
        var params = req.allParams();
        Articles.findOne({id:params.id}).exec(function(err,article){
            if(err){
                res.send(500,{error:'Database Error'});
            }
            utility.escribirLog("READ");
            return res.json(article['nombre']);
        });
    },
    actualizar:function(req,res){
        var params = req.allParams();
        Articles.update({id:params.id},{nombre:params.nombre,apellido:params.apellido,edad:params.edad,direccion:params.direccion}).exec(function(err,article){
            if(err){
                res.send(500,{error:'Database Error'});
            }
            utility.escribirLog("UPDATE");
            return res.json(article);
        });
    },
    eliminar:function(req,res){
        var params = req.allParams();
        Articles.destroy({id:params.id}).exec(function(err){
            if(err){
                res.send(500,{error:'Database Error'});
            }
            utility.escribirLog("DELETE");
            res.send("deleted");

        });
    },
    buscar:function(req,res){
        var params = req.allParams();
        Articles.find({nombre:params.nombre}).exec(function(err,estudiantes){
            if(err){
                res.send(500,{error:'Database Error'});
            }
            utility.escribirLog("READ");
            return res.json(estudiantes);
        });
    }
};

