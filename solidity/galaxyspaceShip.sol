// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GalaxySpaceshipToken is ERC721, Ownable {
    mapping (uint256 => address) internal tokenOwner;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    ERC20 public GXGToken;

    string[] commonImages;//uri
    string[] uncommonImages;//uri
    string[] rareImages;//uri
    string[] legendaryImages;//uri
    string[] commonWeapons;
    string[] uncommonWeapons;
    string[] rareWeapons;
    string[] legendaryWeapons;
    string[] commonSpecials;
    string[] uncommonSpecials; 
    string[] rareSpecials;
    string[] legendarySpecials;
    uint[] presaleRarityPercentages;
    uint[] normalRarityPercentages;
    uint commonImagesCount = 0;
    uint uncommonImagesCount = 0;
    uint rareImagesCount = 0;
    uint legendaryImagesCount = 0;
    uint commonSpecialsCount = 0;
    uint uncommonSpecialsCount = 0;
    uint rareSpecialsCount = 0;
    uint legendarySpecialsCount = 0;
    uint commonWeaponsCount = 0;
    uint uncommonWeaponsCount = 0;
    uint rareWeaponsCount = 0;
    uint legendaryWeaponsCount = 0;

    bool presale = true;
    uint public minPrice = 100;

    struct Spaceship{
        uint number;
        string image;        
        string weapon1;
        string weapon2;
        string weapon3;
        string special;
        uint8 rarity;//4 rarity
        uint durability;
        uint health;
        uint speed;//1-5
    }

    uint nonce = 0;
    Spaceship[] public spaceships;
    
  
    constructor(address _token) ERC721("Galaxy Spaceship V1.3", "GXS")
    {
        presaleRarityPercentages.push(50);
        presaleRarityPercentages.push(30);
        presaleRarityPercentages.push(17);
        presaleRarityPercentages.push(3);

        normalRarityPercentages.push(70);
        normalRarityPercentages.push(30);
        GXGToken = ERC20(_token);
    }    

    function mintToken(address toAdr) public returns(uint256){
        require(commonImages.length > 0);
        require(uncommonImages.length > 0);
        require(rareImages.length > 0);
        require(legendaryImages.length > 0);
        require(commonWeapons.length > 0);
        require(uncommonWeapons.length > 0);
        require(rareWeapons.length > 0);
        require(legendaryWeapons.length > 0);
        require(commonSpecials.length > 0);
        require(uncommonSpecials.length > 0);
        require(rareSpecials.length > 0);
        require(legendarySpecials.length > 0);
        
        require(GXGToken.allowance(msg.sender, address(this)) >= minPrice, "Not enough of GXG token");//To ensure they will deposit the right amount
        GXGToken.transferFrom(msg.sender, owner(), minPrice);

        _tokenIds.increment();
        uint256 _tokenId = _tokenIds.current();
        tokenOwner[_tokenId] = msg.sender;

        Spaceship memory s;

        //rarity check
        uint _rarityRand = rand(0, 100);
        if(presale){
            if(_rarityRand<presaleRarityPercentages[3]){
                s.rarity = 4;
            }else{
                _rarityRand = rand(0, 100);
                if(_rarityRand<presaleRarityPercentages[2]){
                    s.rarity = 3;
                }else{
                    _rarityRand = rand(0, 100);
                    if(_rarityRand<presaleRarityPercentages[1]){
                        s.rarity = 2;
                    }else{
                        s.rarity = 1;
                    }
                }
            }
        }else{
            if(_rarityRand<normalRarityPercentages[1]){
                s.rarity = 2;
            }else{
                s.rarity = 1;
            }
        }
        
        s = setAttributes(s);

        s.number = _tokenId;
        
        spaceships.push(s);
        
        _safeMint(toAdr, _tokenId);

        return _tokenId;
    }


    function removeWeaponsTemp(string[] memory _weaponsTemp, uint _index) pure internal returns(string[] memory){
        _weaponsTemp[_index] = _weaponsTemp[_weaponsTemp.length - 1];

        return _weaponsTemp;
    }

    function setAttributes(Spaceship memory s) internal returns(Spaceship memory){
        string[] memory _weaponsTemp;
        string[] memory _specialsTemp; 
        uint _weaponRand; 
        uint i; 
        uint index;
        uint allWeaponCount;
        uint allSpecialCount;        
        
        if(s.rarity == 1){
            s.image = commonImages[rand(0, commonImagesCount-1)];
            s.weapon1 = commonWeapons[rand(0, commonWeaponsCount-1)];
            s.special = commonSpecials[rand(0, commonSpecialsCount-1)];              
            s.durability = rand(100,200);
            s.health = 3;
            s.speed = 1;
        }else if(s.rarity == 2){
            allWeaponCount = commonWeaponsCount+uncommonWeaponsCount;
            _weaponsTemp = new string[] (allWeaponCount);
            allSpecialCount = commonSpecialsCount+uncommonSpecialsCount;
            _specialsTemp = new string[] (allSpecialCount);
            index = 0;
            for(i=0;i<commonWeaponsCount;i++){
                _weaponsTemp[index] = commonWeapons[i];
                index++;
            }
            for(i=0;i<uncommonWeaponsCount;i++){
                _weaponsTemp[index] = uncommonWeapons[i];
                index++;
            }
            index = 0;
            for(i=0;i<commonSpecialsCount;i++){
                _specialsTemp[index] = commonSpecials[i];
                index++;
            }
            for(i=0;i<uncommonSpecialsCount;i++){
                _specialsTemp[index] = uncommonSpecials[i];
                index++;
            }

            s.image = uncommonImages[rand(0, uncommonImagesCount-1)];
            s.special = _specialsTemp[rand(0, _specialsTemp.length-1)];
            s.durability = rand(200,300);
            s.health = rand(3,4);
            s.speed = rand(1,3);

            _weaponRand = rand(0, allWeaponCount-1);
            s.weapon1 = _weaponsTemp[_weaponRand];  
            _weaponsTemp[_weaponRand] = _weaponsTemp[_weaponsTemp.length - 1];            
            allWeaponCount--;

            _weaponRand = rand(0, allWeaponCount-1);
            s.weapon2 = _weaponsTemp[_weaponRand];  
        }else if(s.rarity == 3){
            allWeaponCount = commonWeaponsCount+uncommonWeaponsCount+rareWeaponsCount;
            _weaponsTemp = new string[] (allWeaponCount);
            allSpecialCount = commonSpecialsCount+uncommonSpecialsCount+rareSpecialsCount;
            _specialsTemp = new string[] (allSpecialCount);
            index = 0;
            for(i=0;i<commonWeaponsCount;i++){
                _weaponsTemp[index] = commonWeapons[i];
                index++;
            }
            for(i=0;i<uncommonWeaponsCount;i++){
                _weaponsTemp[index] = uncommonWeapons[i];
                index++;
            }
            for(i=0;i<rareWeaponsCount;i++){
                _weaponsTemp[index] = rareWeapons[i];
                index++;
            }
            index = 0;
            for(i=0;i<commonSpecialsCount;i++){
                _specialsTemp[index] = commonSpecials[i];
                index++;
            }
            for(i=0;i<uncommonSpecialsCount;i++){
                _specialsTemp[index] = uncommonSpecials[i];
                index++;
            }
            for(i=0;i<rareSpecialsCount;i++){
                _specialsTemp[index] = rareSpecials[i];
                index++;
            }
            s.image = rareImages[rand(0, rareImagesCount-1)];
            s.special = _specialsTemp[rand(0, _specialsTemp.length-1)];
            s.durability = rand(300,400);
            s.health = rand(3,5);
            s.speed = rand(2,4);

            _weaponRand = rand(0, allWeaponCount-1);
            s.weapon1 = _weaponsTemp[_weaponRand];  
            _weaponsTemp[_weaponRand] = _weaponsTemp[_weaponsTemp.length - 1];
            allWeaponCount--;

            _weaponRand = rand(0, _weaponsTemp.length-1);
            s.weapon2 = _weaponsTemp[_weaponRand];  
            _weaponsTemp[_weaponRand] = _weaponsTemp[_weaponsTemp.length - 1];
            allWeaponCount--;

            _weaponRand = rand(0, _weaponsTemp.length-1);
            s.weapon3 = _weaponsTemp[_weaponRand];  
        }else if(s.rarity == 4){
            allWeaponCount = uncommonWeaponsCount+rareWeaponsCount+legendaryWeaponsCount;
            _weaponsTemp = new string[] (allWeaponCount);
            index = 0;
            for(i=0;i<uncommonWeaponsCount;i++){
                _weaponsTemp[index] = uncommonWeapons[i];
                index++;
            }
            for(i=0;i<rareWeaponsCount;i++){
                _weaponsTemp[index] = rareWeapons[i];
                index++;
            }
            for(i=0;i<legendaryWeaponsCount;i++){
                _weaponsTemp[index] = legendaryWeapons[i];
                index++;
            }

            s.image = legendaryImages[rand(0, legendaryImagesCount-1)];
            s.special = legendarySpecials[rand(0, legendarySpecialsCount-1)];
            s.durability = rand(400,500);
            s.health = rand(4,5);
            s.speed = rand(3,5);

            _weaponRand = rand(0, allWeaponCount-1);
            s.weapon1 = _weaponsTemp[_weaponRand];  
            _weaponsTemp[_weaponRand] = _weaponsTemp[_weaponsTemp.length - 1];
            allWeaponCount--;

            _weaponRand = rand(0, allWeaponCount-1);
            s.weapon2 = _weaponsTemp[_weaponRand];  
            _weaponsTemp[_weaponRand] = _weaponsTemp[_weaponsTemp.length - 1];
            allWeaponCount--;

            _weaponRand = rand(0, allWeaponCount-1);
            s.weapon3 = _weaponsTemp[_weaponRand];  
        }
        return s;
    }

    function burn(uint256 _tokenId) public onlyOwner {
        super._burn(_tokenId);
    }

    function initImages(uint _rarity, string memory _image) public onlyOwner {
        if(_rarity == 1){
            commonImages.push(_image);
            commonImagesCount++;
        }else if(_rarity == 2){
            uncommonImages.push(_image);
            uncommonImagesCount++;
        }else if(_rarity == 3){
            rareImages.push(_image);
            rareImagesCount++;
        }else if(_rarity == 4){
            legendaryImages.push(_image);
            legendaryImagesCount++;
        }
    }

    function activatedPresaleMint(bool _active) public onlyOwner{
        presale = _active;
    }

    function changePresaleRarity( uint8 _rarity, uint8 _percentage) public onlyOwner {
       require(_rarity>0 && _rarity<=4 && _percentage>0 && _percentage <=100);
        if(_rarity == 1){
            presaleRarityPercentages[0]=_percentage;
        }else if(_rarity == 2){
            presaleRarityPercentages[1]=_percentage;
        }else if(_rarity == 3){
            presaleRarityPercentages[2]=_percentage;
        }else if(_rarity == 4){
            presaleRarityPercentages[3]=_percentage;
        }
    }

    function changeNormalRarity( uint8 _rarity, uint8 _percentage) public onlyOwner {
       require(_rarity>0 && _rarity<=2 && _percentage>0 && _percentage <=100);
        if(_rarity == 1){
            normalRarityPercentages[0]=_percentage;
        }else if(_rarity == 2){
            normalRarityPercentages[1]=_percentage;
        }
    }

    function initWeapons(uint8 _rarity, string memory _weapon) public onlyOwner {
        if(_rarity == 1){
            commonWeapons.push(_weapon);
            commonWeaponsCount++;
        }else if(_rarity == 2){
            uncommonWeapons.push(_weapon);
            uncommonWeaponsCount++;
        }else if(_rarity == 3){
            rareWeapons.push(_weapon);
            rareWeaponsCount++;
        }else if(_rarity == 4){
            legendaryWeapons.push(_weapon);
            legendaryWeaponsCount++;
        }
        
    }

    function initSpecials(uint8 _rarity, string memory _special) public onlyOwner {
        if(_rarity == 1){
            commonSpecials.push(_special);
            commonSpecialsCount++;
        }else if(_rarity == 2){
            uncommonSpecials.push(_special);
            uncommonSpecialsCount++;
        }else if(_rarity == 3){
            rareSpecials.push(_special);
            rareSpecialsCount++;
        }else if(_rarity == 4){
            legendarySpecials.push(_special);
            legendarySpecialsCount++;
        }
        
    }

    function rand(uint min, uint max) internal returns (uint){
        if(max>min){
            nonce++;
            uint randomNum = uint(keccak256(abi.encodePacked(nonce)));
            uint rangeNum = (max-min)+1;
            uint moded = randomNum%rangeNum;
            return moded+min;
        }else{
            return min;
        }
    }

    function initPrice(uint price) public onlyOwner {
        minPrice = price;
    }

    function clearImages(uint _rarity)external onlyOwner{
        if(_rarity==1){
            delete commonImages;
            commonImagesCount = 0;
        }else if(_rarity==2){
            delete uncommonImages;
            uncommonImagesCount = 0;
        }else if(_rarity==3){
            delete rareImages;
            rareImagesCount = 0;
        }else if(_rarity==4){
            delete legendaryImages;
            legendaryImagesCount = 0;
        }
    }

    function clearWeapons(uint _rarity)external onlyOwner{
        if(_rarity==1){
            delete commonWeapons;
            commonWeaponsCount =0;
        }else if(_rarity==2){
            delete uncommonWeapons;
            uncommonWeaponsCount =0;
        }else if(_rarity==3){
            delete rareWeapons;
            rareWeaponsCount =0;
        }else if(_rarity==4){
            delete legendaryWeapons;
            legendaryWeaponsCount =0;
        }
    }

    function clearSpecials(uint _rarity)external onlyOwner{
        if(_rarity==1){
            delete commonSpecials;
            commonSpecialsCount = 0;
        }else if(_rarity==2){
            delete uncommonSpecials;
            uncommonSpecialsCount = 0;
        }else if(_rarity==3){
            delete rareSpecials;
            rareSpecialsCount = 0;
        }else if(_rarity==4){
            delete legendarySpecials;
            legendarySpecialsCount = 0;
        }
    }

    function getImages(uint _rarity)view public returns(string[] memory images){
        if(_rarity==1){
            return commonImages;
        }else if(_rarity==2){
            return uncommonImages;
        }else if(_rarity==3){
            return rareImages;
        }else if(_rarity==4){
            return legendaryImages;
        }
    }

    function getWeapons(uint _rarity)view public returns(string[] memory weapons){
        if(_rarity==1){
            return commonWeapons;
        }else if(_rarity==2){
            return uncommonWeapons;
        }else if(_rarity==3){
            return rareWeapons;
        }else if(_rarity==4){
            return legendaryWeapons;
        }
    }

    function getSpecials(uint _rarity)view public returns(string[] memory specials){
        if(_rarity==1){
            return commonSpecials;
        }else if(_rarity==2){
            return uncommonSpecials;
        }else if(_rarity==3){
            return rareSpecials;
        }else if(_rarity==4){
            return legendarySpecials;
        }
    }

    function get
    
}