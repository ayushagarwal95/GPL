/*
 *  GraVITas Premier League
 *  Copyright (C) 2014  IEEE Computer Society - VIT Student Chapter <ieeecs@vit.ac.in>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var MongoClient = require('mongodb').MongoClient;

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/GPL';

exports.insert = function (doc, callback)
{
    var onConnect = function (err, db)
    {
        if (err)
        {
            callback(err);
        }
        else
        {
            var collection = db.collection('users');
            var onInsert = function (err, docs)
            {
                db.close();
                if (err)
                {
                    callback(err, null);
                }
                else
                {
                    callback(null, docs);
                }
            };
            collection.insert(doc, {w: 1}, onInsert);
        }
    };
    MongoClient.connect(mongoUri, onConnect);
};

exports.fetch = function (doc, callback)
{
    var onConnect = function (err, db)
    {
        if (err)
        {
            callback(err);
        }
        else
        {
            var collection = db.collection('users');
            var onFetch = function (err, document)
            {
                if (err)
                {
                    callback(err, null);
                }
                else if (document)
                {
                    db.close();
                    if (doc['_id'] === document['_id'])
                    {
                        callback(null, document);
                    }
                    else
                    {
                        callback(false, null);
                    }

                }
                else
                {
                    callback(true, null);
                }
            };
            collection.findOne(doc, onFetch);
        }
    };
    MongoClient.connect(mongoUri, onConnect);
};

exports.getleader = function (doc, callback)
{
    var onConnect = function (err, db)
    {
        if (err)
        {
            callback(err);
        }
        else
        {
            var collection = db.collection('users');
            var onFetch = function (err, documents)
            {
                if (err)
                {
                    callback(err, null);
                }
                else
                {
                    var onFetchOne = function (err, document)
                    {
                        if (err)
                        {
                            callback(err, null);
                        }
                        else
                        {
                            documents.push(document);
                            callback(null, documents);
                        }
                        collection.findOne(doc, onFetchOne);
                    }
                }
            };
            var options =
            {
                "limit": 10,
                "sort": [
                    ['points', 'desc'],
                    ['net_run_rate', 'desc']
                ]
            };

            collection.find({}, options).toArray(onFetch);
            //collection.find({},onFetch);
        }
    };
    MongoClient.connect(mongoUri, onConnect);

};

exports.forgotPassword = function (doc, callback)
{
    var onConnect = function (err, db)
    {
        if (err)
        {
            callback(err, null);
        }
        else
        {
            var collection = db.collection('users');
            var onFetch = function (err, document)
            {
                if (err)
                {
                    callback(err, null);
                }
                else
                {
                    if (document)
                    {
                        callback(null, document);
                    }
                    else
                    {
                        callback(false, null);
                    }

                }
            };
            collection.findOne(doc, onFetch);
        }

    };
    MongoClient.connect(mongoUri, onConnect);
};

exports.updateUser = function(doc, arr, callback)
{
    var onConnect = function(err,db)
    {
        if(err)
        {
            throw err;
        }
        else
        {
            var collection = db.collection('users');
            var onUpdate = function(err,document)
            {
                if(err)
                {
                    callback(err,null);
                }
                else
                {
                    callback(true,document);
                }
            };
            collection.findAndModify(doc,[],{$set : {'team' : arr}},{},onUpdate)
        }
    };
    MongoClient.connect(mongoUri,onConnect);

};