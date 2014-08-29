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


exports.fetchPlayers = function (callback)
{
    var onConnect = function (err, db)
    {
        if (err)
        {
            callback(err);
        }
        else
        {
            var collection = db.collection('players');
            var onFetch = function (err, documents)
            {
                if (err)
                {
                    callback(err, null);
                }
                else
                {
                    callback(null, documents);
                }
            };
            collection.find({}).toArray(onFetch);
        }
    };
    MongoClient.connect(mongoUri, onConnect);
};

exports.getPlayer = function(doc,callback)
{
    var onConnect = function(err,db)
    {
        if(err)
        {
            callback(err);
        }
        else
        {
            var collection = db.collection('players');
            var onFetch = function(err,document)
            {
                if(err)
                {
                    callback(err,null);
                }
                else
                {
                    callback(null,document);
                }
            };
            collection.findOne(doc,onFetch);
        }
    };
    MongoClient.connect(mongoUri,onConnect);
}