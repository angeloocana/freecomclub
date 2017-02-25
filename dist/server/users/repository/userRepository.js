"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function UserRepository(db) {
    function getUserDbCollection() {
        return db.collection('users');
    }
    function save(user) {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return getUserDbCollection().replaceOne({ _id: user.id }, user, { upsert: true });

                        case 2:
                            result = _context.sent;

                            user = result.ops[0];
                            if (result.upsertedId) user.id = result.upsertedId._id;
                            return _context.abrupt("return", Promise.resolve(user));

                        case 6:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    }
    function getByIds(ids) {
        var query = {
            _id: {
                $in: ids
            }
        };
        return getUserDbCollection().find(query).toArray();
    }
    function find(query, options) {
        var result = getUserDbCollection().find(query, {}, options).toArray();
        return result;
    }
    function getOtherUsersWithSameUserNameOrEmail(user) {
        var query = {
            _id: { $ne: user.id },
            $or: [{ email: user.email }, { userName: user.userName }]
        };
        return getUserDbCollection().find(query, { userName: 1, email: 1 }).toArray();
    }
    function getByUserNameOrEmail(userNameOrEmail) {
        var query = {
            $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }]
        };
        return getUserDbCollection().findOne(query);
    }
    return {
        save: save,
        find: find,
        getByUserNameOrEmail: getByUserNameOrEmail,
        getByIds: getByIds,
        getOtherUsersWithSameUserNameOrEmail: getOtherUsersWithSameUserNameOrEmail
    };
}
exports.default = UserRepository;