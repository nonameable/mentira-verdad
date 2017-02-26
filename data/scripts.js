db.createCollection("tweets", { capped: true,
                              size: 30,
                              validator: { $and:
                                [
                                  { username: { $type: "string" } },
                                  { text: { $type: "string" } },
                                  { upvotes: { $type: "int" } },
                                  { downvotes: { $type: "int" } },
                                  { profile_pic_url: { $type: "string" }}

                                ]
                              }
                            });

db.createCollection("popular_tweets", { capped: true,
                            size: 365,
                            validator: { $and:
                              [
                                { username: { $type: "string" } },
                                { text: { $type: "string" } },
                                { upvotes: { $type: "int" } },
                                { downvotes: { $type: "int" } },
                                { profile_pic_url: { $type: "string" }}

                              ]
                            }
                          });
db.createCollection("update_logs", { capped: true,
                              size: 365,
                              validator: { $and:
                                [
                                  { date: { $type: "date" } },
                                ]
                              }
                            });
